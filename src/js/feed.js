  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  import {
    getFirestore,
    collection,
    getDocs,
    doc,
    updateDoc
  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyD1mLsKEpVUvsOsnzaoNmaEHzsNM6ORGqc",
    authDomain: "itext-realme.firebaseapp.com",
    projectId: "itext-realme",
    storageBucket: "itext-realme.appspot.com",
    messagingSenderId: "540414487794",
    appId: "1:540414487794:web:3dca30a050d6b5e131746b",
    measurementId: "G-E9DL66RH8G"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const feed = document.getElementById('feed');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const filterSort = document.getElementById('filter-sort');

  let posts = [];
  let displayedCount = 0;
  const perPage = 4;

  function formatDate(ts) {
    const d = ts.toDate();
    return d.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
  }

  async function loadPosts() {
    const snap = await getDocs(collection(db, 'posts'));
    posts = snap.docs.map(d => ({
      id: d.id,
      ...d.data(),
      liked: false,
      reported: false
    }));
    displayedCount = perPage;
    renderPosts();
  }

  function renderPosts() {
    feed.innerHTML = '';
    const sorted = [...posts];
    if (filterSort.value === 'date-desc') sorted.sort((a,b)=>b.data.seconds-a.data.seconds);
    else if (filterSort.value === 'date-asc') sorted.sort((a,b)=>a.data.seconds-b.data.seconds);
    else if (filterSort.value === 'likes-desc') sorted.sort((a,b)=> (b.likes||0)-(a.likes||0));

    const slice = sorted.slice(0, displayedCount);
    slice.forEach(p => {
      const el = document.createElement('div');
      el.className = 'post-user';
      el.innerHTML = `
        <div class="text-outputed">${p.texto}</div>
        <div class="reactions">
          <div class="reactions-left">${formatDate(p.data)}</div>
          <div class="reactions-right">
            <button class="btn-like ${p.liked?'liked':''}" data-id="${p.id}">
              <i class="far fa-heart"></i> Curtir (${p.likes||0})
            </button>
            <button class="btn-report ${p.reported?'reported':''}" data-id="${p.id}">
              <i class="far fa-flag"></i> Denunciar
            </button>
          </div>
        </div>`;
      feed.appendChild(el);
    });

    loadMoreBtn.style.display = displayedCount < posts.length ? 'inline-block' : 'none';
  }

  loadMoreBtn.addEventListener('click', () => {
    displayedCount += perPage;
    renderPosts();
  });

  filterSort.addEventListener('change', ()=>{
    displayedCount = perPage;
    renderPosts();
  });

  feed.addEventListener('click', async e => {
    const l = e.target.closest('.btn-like');
    const r = e.target.closest('.btn-report');
    if (l) {
      const id = l.dataset.id;
      const post = posts.find(x=>x.id===id);
      if (post) {
        post.liked = !post.liked;
        post.likes = post.liked ? (post.likes||0)+1 : (post.likes||0)-1;
        l.classList.toggle('liked');
        await updateDoc(doc(db, 'posts', id), { likes: post.likes });
        renderPosts();
      }
    }
    if (r) {
      const id = r.dataset.id;
      const post = posts.find(x=>x.id===id);
      if (post && !post.reported) {
        post.reported = true;
        r.classList.add('reported');
        alert('Post denunciado. Obrigado!');
      }
    }
  });

  loadPosts();