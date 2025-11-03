import { auth, db, storage } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { collection, addDoc, doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js";

// Redirect to login if not logged in
onAuthStateChanged(auth, user => {
  if (!user) window.location.href = "login.html";
});

// Logout button
document.getElementById("logoutBtn").addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
});

// Check if editing existing book
const editId = localStorage.getItem("editBookId");
if (editId) {
  document.getElementById("formTitle").textContent = "Edit Book";
  document.getElementById("saveBtn").textContent = "Update Book";

  // Load existing data
  const loadBook = async () => {
    const docSnap = await getDoc(doc(db, "books", editId));
    if (docSnap.exists()) {
      const data = docSnap.data();
      document.getElementById("title").value = data.title;
      document.getElementById("author").value = data.author;
      document.getElementById("category").value = data.category;
      // Image will be optional on edit
      document.getElementById("coverImage").required = false;
    }
  };
  loadBook();
}

// Form submit
document.getElementById("bookForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const category = document.getElementById("category").value.trim();
  const fileInput = document.getElementById("coverImage");
  const file = fileInput.files[0];

  try {
    let imageUrl = "";

    // Upload new image if selected
    if (file) {
      const storageRef = ref(storage, `bookCovers/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    const bookData = {
      title,
      author,
      category,
      userId: auth.currentUser.uid,
      status: "available",
    };

    if (imageUrl) bookData.imageUrl = imageUrl;

    if (editId) {
      await updateDoc(doc(db, "books", editId), bookData);
      localStorage.removeItem("editBookId");
      alert("Book updated successfully!");
    } else {
      await addDoc(collection(db, "books"), { ...bookData, imageUrl });
      alert("Book added successfully!");
    }

    window.location.href = "dashboard.html";

  } catch (err) {
    console.error(err);
    alert("Error saving book. Please try again!");
  }
});
