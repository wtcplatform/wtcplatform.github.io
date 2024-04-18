import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { type voteDest, type VoteByOther, type UserWithRights, type User} from "./types";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc, query, limit, orderBy } from 'firebase/firestore/lite';
import { firebaseConfig } from "@/lib/firebase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


const decreaseFirstEligibleUserRightsAndReturnUser = (userList: UserWithRights[]) => {
  // 最大のrightsを持つユーザーを探す
  let maxRightsUser = userList.reduce((acc, user) => user.rights > (acc.rights || 0) ? user : acc, {rights: 0});

  if (maxRightsUser.rights === 0) {
    throw new Error("#votes exceeds the number of available users.")
  }

  // 更新されたユーザーリストを生成し、最大のrightsを持つユーザーのrightsを減らす
  const updatedUsers = userList.map(user => {
    if (user === maxRightsUser) { // 条件を満たすユーザーが見つかった場合
      const updatedUser = {...user, rights: user.rights - 1}; // rightsを1減らす
      maxRightsUser = updatedUser; // 更新後のユーザーを最大のrightsを持つユーザーとして格納
      return updatedUser;
    }
    return user; // 条件を満たさない場合は元のユーザーオブジェクトをそのまま返す
  });

  return {
    updatedUsers,
    foundUser: maxRightsUser.rights >= 0 ? maxRightsUser : null // 条件を満たすユーザー、見つからなかった場合はnull
  };
}


export const getUserList = async ({onlyAvailable=false}): Promise<User[]> => {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const userCollection = collection(db, 'account_list');
  const latestDocQuery = query(userCollection, orderBy('createdAt', 'desc'), limit(1));
  const snapshot = await getDocs(latestDocQuery);

  if (snapshot.empty) {
    throw Error("No user documents found");
  }
  const latestDocData = snapshot.docs[0].data();
  const userList = Object.values(latestDocData.userJson) as User[]
  if (onlyAvailable) {
    const availableUsers = userList.filter((user) => {
      return (("penaltyCount" in user) && ((user.penaltyCount || 0) >= 0) && ((user.penaltyCount || 0) <= 3))
    });
    return availableUsers;
  }
  return userList;
}

export const getProgress = async (): Promise<{"total": number, "done": number}> => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const userCollection = collection(db, 'voteDest');
  const newestVoteByOther = query(userCollection, orderBy('createdAt', 'desc'), limit(1));
  const voteSnapshot = await getDocs(newestVoteByOther);
  if (!voteSnapshot.empty) {
    const voteDest = voteSnapshot.docs[0].data().data; // Get the data of the newest document
    return {"total": Object.keys(voteDest).length, "done": Object.values(voteDest).filter((vote: any) => vote.done).length};
  } else {
    throw new Error("No voteByOther documents found");
  }
}
// get the data from Firestore
export const getVoteByOther = async (): Promise<VoteByOther> => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const userCollection = collection(db, 'voteByOther');
  const newestVoteByOther = query(userCollection, orderBy('createdAt', 'desc'), limit(1));
  const voteSnapshot = await getDocs(newestVoteByOther);

  if (!voteSnapshot.empty) {
    const newestDocument = voteSnapshot.docs[0].data().data; // Get the data of the newest document
    console.log(newestDocument);
    return newestDocument;
  } else {
    throw new Error("No voteByOther documents found");
  }
}


export const pushDataToFirestore = async ({collectionName = "voteDest", data = {}, docId = (new Date()).toISOString()}) => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  try {
    await setDoc(doc(db, collectionName, docId), {"createdAt": new Date(), "data": data});
    alert("データの送信に成功しました！")
  } catch (error) {
    console.error('Error writing document: ', error);
  }
}

export function convertDataToVotedest(userList: User[], data: VoteByOther) {
  // Take an Object of #votes and a list of accounts, returns destinations ready for voting.
  // for test
  const voteDestList: voteDest[] = [];

  const userListTimesfour = [...userList, ...userList, ...userList, ...userList];
  let idx = 0;
  for (const date in data) {
    // data[date]の各コートをループ
    for (const court in data[date]) {
      // data[date][court]の各時間帯をループ
      for (const time in data[date][court]) {
        const count = data[date][court][time];
        // 指定された回数分、時間帯をoutputArrayに追加
        for (let i = 0; i < count; i++) {

          let user = userListTimesfour[idx];
          let voteDest: voteDest = {date: date, destination: court, time: time, serial: user.serial.toString(), id: user.id.toString(), password: user.password.toString(), done: false};
          voteDestList.push(voteDest);
          console.log(voteDestList.length);
          idx++;
        }
      }
    }
  }
  return voteDestList;
}


export const calculateNumberOfVotes = (data: VoteByOther) => {
  let count = 0;
  for (const date in data) {
    for (const court in data[date]) {
      for (const time in data[date][court]) {
        count += data[date][court][time];
      }
    }
  }
  return count;
}
