## 今進行中のtodoリストについて
VoteDestCreatedAtの除去
- VoteDestが作成された時点でStatusのVoteDestLastUpdatedを更新するようにする。
- VoteDestの作成はaws step functionsのvote上で行われる。

voteを完成させる


基本的には入力なしで投票まで一貫してやるシステムである。checkAccountsを毎回走らせるとテストに時間がかかり、また実際の投票期間にならないとテストできないという問題があるので、アトミックな単位(一票の投票や、一個のアカウントのチェック)の動作を確認して、そのモックの結果を組み合わせる手法でテストしたいが、AWS step functionsの制約上step functions上でそれをエミュレートするのは厳しい。　aws lambda上で各関数をモジュールにして、その動作を確認、という流れをとる。テストモードを作っても面白い。debug:trueにすると、アトミックな単位は飛ばすという仕様。これはPasstateを2つ組み合わせることで実装できる。

データベースからのfetch, pushはコストが低く、スクレイピングはコストが高いので、デバッグ用モードを作成する代わりにスクレイピングのたびにデータベースにpushし、モジュール間の独立性を高める(スクレイピングし、直で他の処理にデータを渡すことをしない。)
そのために、step functionsを作成するときはtest(関数名)という名前のステートマシンを先に作って、重い処理を省く。

面白いデザイン原則として、スケールの小さいソフトウェア・ハードウェアについてはデザインのコストが最も大きいので、高価なソリューション・甘い最適化を許容してデザインコストを下げることが重要。無料で運用するなど馬鹿らしい。

- [x] checkAccountsの実行
- [x] アカウント一覧とユーザーがアップロードしたvoteDestRawを、fireStoreから取得。{..., "data": {"account_list": ..., "voteDestRaw": ...}} の形の出力にする。
- [ ] voteDestの作成
- [ ] voteDestをもとに投票
- [ ] (フロントエンド)　フロントエンド上で、埼玉県のシステムとインタラクトする各システムにおいて、[開始時刻, 開始時刻+かかる予想時間]がダウンタイムとかぶらないことを保証する、かぶるならアラートを出し、実行をさせない。
- [ ] (フロントエンド)　フロントエンド上で、アップロードされたvoteDestRawの票数が利用可能な票数を超えているなら使用させない。正確な利用可能票数を算出することは不可能なので、月初にcheckAccountsを走らせaccount_listを更新するとともに10%程度の安全マージンをとった暫定値を利用する。

# Todo
# フロントエンド
## Page
AccountsComponent
- [x] アカウントの更新とダウンロードを行う機能を実装する。

ReservationComponent
- [ ] 各種最終更新日を、Statusから引っ張ってきて掲載する。

# バックエンド
AWS lambda functions 
- [ ] voteを完成させる。

リファクタリング
Statusへのサイトの情報管理の一本化
- [ ] VoteDestCreatedAtの除去
      VoteDestが作成された時点でStatusのVoteDestLastUpdatedを更新するようにする。voteDestの作成はaws step functionsで行われ、
- [ ] VoteByOtherCreatedAtの除去

AWS step functionsについて
- [x] checkAccountsを完成させる
- [ ] 


普通に日本語で書いた方がよさそう。
今取り組んでいるwtc-platformの複雑性が増しており、どこをいじるべきなのか、プロダクトの目的が何なのかということがさっぱりわからなくなっている。

これは将来的な保守性の低下につながる。時間をとって機能のダイアグラムを作る。

# Todo(legacy)
1. Vote on aws lambda, connecting to aws step functions.
2. Trigger from local environment
3. Confirm on aws lambda(it doesn't require pushing data to Firestore), connecting to aws step functions.

# format of response(on AWS lambda function)
Follow the example below:
```javascript
export const handler = async (event) => {
  const courtTaken = {"foo": "bar"};
  let response = JSON.stringify({
    stateUpdates: [
      { confirmState: "処理中" },
      { lastUpdated: new Date().toISOString() }
    ],
    databaseUpdate: {
      collectionName: 'courtTaken',
      docId: new Date().toISOString(),
      data: courtTaken
    },
    databaseQueries: [
      {collectionName: 'courtTaken'},
    ],
    data: {
      courtTaken: courtTaken
    },
    loopContinue: true || false // Default to false if not provided
  });
  return response;
}
```
Don't omit any attributes.(Otherwise it doesn't work)
List of allowed confirmStates are:
["処理中", "完了", "失敗", "未実施"]]

A response of functions should follow this format for ease.

Status should be updated periodically at the beginning of every month:
1. create a new document "YYYY-MM"
2. set {event}LastUpdated to current date, {event}State to "未実施"
