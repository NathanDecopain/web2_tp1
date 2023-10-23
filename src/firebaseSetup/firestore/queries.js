import {collection, query, where, or, and, onSnapshot, doc, getDocs} from "firebase/firestore"
import {firebaseApp} from "../firebaseConfig.js";

const usersRef = collection(firebaseApp.db, "users");
export function findUsersByString(queryString) {
    return query(usersRef,
                where("username", ">=", queryString)
    )
}

export function findOneOnOneChatRoomDocs(userAId, userBId) {
    const groupsRef = collection(firebaseApp.db, "groups")
    return getDocs(query(groupsRef,
        where(`members.${String(userAId).trim()}`, "==", true),
        where(`members.${String(userBId).trim()}`, "==", true),
        where("isGroupChat", "==", false)
    ))
}
