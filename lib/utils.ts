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
  let foundUser: (any) = null; // 条件を満たすユーザーを格納する変数

  const updatedUsers = userList.map(user => {
      // まだ条件を満たすユーザーを見つけておらず、かつ、userがrightsプロパティを持ち、その値が1以上である場合
      if (!foundUser && user.rights && user.rights >= 1) {
          foundUser = {...user, rights: user.rights - 1}; // 条件を満たすユーザーをコピーし、rightsを1減らす
          return foundUser; // 更新したユーザーオブジェクトを返す
      }
      return user; // 条件を満たさない場合は元のユーザーオブジェクトをそのまま返す
  });

  return {
      updatedUsers,
      foundUser // 条件を満たすユーザー、見つからなかった場合はnull
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
      ("penaltyCount" in user) && ((user.penaltyCount ?? 0) >= 0) && ((user.penaltyCount ?? 0) <= 4)
    });
    return availableUsers;
  }
  return userList;
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
    console.log('Data pushed to Firestore successfully');
  } catch (error) {
    console.error('Error writing document: ', error);
  }
}

export function convertDataToVotedest(userList: User[], data: VoteByOther) {
  // Take an Object of #votes and a list of accounts, returns destinations ready for voting.
  // for test
  const voteDestList: voteDest[] = [];
  let updatedUsers: UserWithRights[] = userList.map(user => ({...user, rights: 4}));

  for (const date in data) {
    // data[date]の各コートをループ
    for (const court in data[date]) {
      // data[date][court]の各時間帯をループ
      for (const time in data[date][court]) {
        const count = data[date][court][time];
        // 指定された回数分、時間帯をoutputArrayに追加
        for (let i = 0; i < count; i++) {
          let {updatedUsers: newUpdatedUsers, foundUser} = decreaseFirstEligibleUserRightsAndReturnUser(updatedUsers);
          updatedUsers = newUpdatedUsers;
          if (!foundUser) {
            throw new Error('User not found');
          }
          let voteDest: voteDest = {date: date, destination: court, time: time, serial: foundUser.serial.toString(), id: foundUser.id.toString(), password: foundUser.password.toString(), done: false};
          voteDestList.push(voteDest);
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