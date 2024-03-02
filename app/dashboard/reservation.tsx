'use client';
import { VoteByOther } from "@/lib/types";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc, query, limit, orderBy } from 'firebase/firestore/lite';
import { firebaseConfig } from "@/lib/firebase";

import { Button } from "@/components/ui/button";
import { getDatabase } from "firebase/database";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function ReservationComponent() {
    //1. Scrape votes from the website
    //2. Push the votes object to the firestore
    //3. Create a votedest from the object.
    //4. Vote from the votedest
    // The problem is how to specify the votedest and votes object to use:
    //  -> Simply delete votedest and votebyother every time

    const sampleVote = {
        "2024-04-05": {
            "1番": {
                "08:30": 1,
                "10:30": 2,
                "12:30": 3,
                "14:30": 4,
                "16:30": 5,
                "18:30": 6.
            },
            "2番": {
                "08:30": 21,
                "10:30": 22,
                "12:30": 23,
                "14:30": 24,
                "16:30": 25,
                "18:30": 26.
            }
        } 
    } satisfies VoteByOther;

    // push the data to firestore
    async function pushDataToFirestore({/*dataObject: VoteByOther*/}) {
        // const dateStr = new Date().toISOString();
        const collectionName = 'voteByOther'; // Replace with your collection name
        const docId = `${new Date()}`; // Replace with your document ID or generate one

        // Push the data to Firestore
        try {
          await setDoc(doc(db, collectionName, docId), {"createdAt": new Date(), ...sampleVote});
          console.log('Data pushed to Firestore successfully');
        } catch (error) {
          console.error('Error writing document: ', error);
        }
      }

    // get the data from Firestore
    async function getDatabase() {
      const userCollection = collection(db, 'voteByOther');
      const newestVoteByOther = query(userCollection, orderBy('createdAt', 'desc'), limit(1));
      const voteSnapshot = await getDocs(newestVoteByOther);

      if (!voteSnapshot.empty) {
        const newestDocument = voteSnapshot.docs[0].data(); // Get the data of the newest document
        console.log(newestDocument);
        return newestDocument;
      } else {
        console.log("No documents found");
        return null;
      }
    }

    // async function reserve() {
    //     voteByOthers = getDatabase
    // }
    
    

    return (
        <div>
            <h1>Reservation</h1>
            <Button onClick={pushDataToFirestore}>Push data to Firestore(sample)</Button>
            <Button onClick={getDatabase}>Get voteByOther from Firestore(sample)</Button>
        </div>
    );
}