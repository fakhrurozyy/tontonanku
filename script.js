const titles = [
  { title:'Interstellar', type:'film', year:'2014', rating:'9.5', mood:'Deep Talk', review:'Sci-fi emosional tentang waktu, keluarga, dan penyesalan.' },
  { title:'Gadis Kretek', type:'series', year:'2023', rating:'8.8', mood:'Local Drama', review:'Series Indonesia dengan visual kuat dan cerita keluarga yang pekat.' },
  { title:'Dark', type:'series', year:'2017', rating:'9.0', mood:'Mind-Bending', review:'Timeline ribet, misterius, dan cocok buat dibahas semalaman.' },
  { title:'Jujutsu Kaisen', type:'anime', year:'2020', rating:'8.7', mood:'Anime Arc', review:'Action supernatural yang gampang jadi bahan obrolan karakter favorit.' },
  { title:'Ngeri-Ngeri Sedap', type:'film', year:'2022', rating:'8.6', mood:'Local Favorite', review:'Drama keluarga yang lucu, dekat, dan nyakitin di beberapa bagian.' },
  { title:'The Bear', type:'series', year:'2022', rating:'8.9', mood:'Intense', review:'Series dapur yang penuh tekanan, ambisi, dan emosi manusiawi.' },
  { title:'Your Name', type:'anime', year:'2016', rating:'9.1', mood:'Emotional', review:'Anime romance-fantasy yang visualnya indah dan emosinya kena.' },
  { title:'Her', type:'film', year:'2013', rating:'8.9', mood:'Lonely Tech', review:'Film tentang kesepian, teknologi, dan cara manusia mencari koneksi.' },
  { title:'One Piece', type:'anime', year:'1999', rating:'9.2', mood:'Long Journey', review:'Petualangan panjang tentang mimpi, kru, dan dunia yang luas.' },
  { title:'Reply 1988', type:'series', year:'2015', rating:'9.4', mood:'Comfort', review:'Hangat, pelan, dan sangat kuat soal keluarga serta pertemanan.' },
  { title:'Mencuri Raden Saleh', type:'film', year:'2022', rating:'8.2', mood:'Heist Lokal', review:'Film heist lokal yang fun, stylish, dan enak ditonton rame-rame.' },
  { title:'Attack on Titan', type:'anime', year:'2013', rating:'9.3', mood:'Epic', review:'Anime konflik besar, politik, perang, dan pertanyaan moral.' }
];

const friends = [
  { name:'Dinda Cinema', user:'@dinda.cinema', bio:'K-drama, romcom, comfort series, dan tiket bioskop aesthetic.', initial:'D' },
  { name:'Arya Anime', user:'@arya.anime', bio:'Anime seasonal, manga arc, dan rating episode mingguan.', initial:'A' },
  { name:'Naufal Screen', user:'@naufal.screen', bio:'Thriller, sci-fi, dan film yang bikin debat setelah nonton.', initial:'N' }
];

const titleGrid = document.querySelector('#titleGrid');
const searchInput = document.querySelector('#searchInput');
const typeFilter = document.querySelector('#typeFilter');
const friendsGrid = document.querySelector('#friendsGrid');

function posterText(title){
  return title.split(' ').slice(0,3).join('<br/>');
}

function renderTitles(){
  const keyword = searchInput.value.toLowerCase();
  const type = typeFilter.value;
  const filtered = titles.filter(item => {
    const matchText = item.title.toLowerCase().includes(keyword) || item.mood.toLowerCase().includes(keyword);
    const matchType = type === 'all' || item.type === type;
    return matchText && matchType;
  });
  titleGrid.innerHTML = filtered.map(item => `
    <article class="title-card">
      <div class="poster ${item.type}">${posterText(item.title)}</div>
      <h3>${item.title}</h3>
      <div class="meta-line"><span>${item.type}</span><span>${item.year}</span><span>${item.rating}/10</span></div>
      <p>${item.review}</p>
      <div class="card-actions">
        <button class="mini-btn dark">Add to Profile</button>
        <button class="mini-btn">Review</button>
        <button class="mini-btn">${item.mood}</button>
      </div>
    </article>
  `).join('') || '<p class="muted">Tidak ada hasil dummy.</p>';
}

function renderFriends(){
  friendsGrid.innerHTML = friends.map(friend => `
    <article class="friend-card">
      <div class="avatar">${friend.initial}</div>
      <h3>${friend.name}</h3>
      <strong>${friend.user}</strong>
      <p>${friend.bio}</p>
      <button class="mini-btn add-friend">Add Friend</button>
    </article>
  `).join('');
}

renderTitles();
renderFriends();
searchInput.addEventListener('input', renderTitles);
typeFilter.addEventListener('change', renderTitles);

document.querySelector('#menuBtn').addEventListener('click', () => {
  document.querySelector('#mobileMenu').classList.toggle('open');
});

document.querySelectorAll('.playlist-row').forEach(row => {
  row.addEventListener('click', () => {
    document.querySelectorAll('.playlist-row').forEach(r => r.classList.remove('active'));
    row.classList.add('active');
  });
});

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

document.addEventListener('click', (event) => {
  const openId = event.target.dataset.open;
  const closeId = event.target.dataset.close;
  if(openId) document.getElementById(openId).classList.add('show');
  if(closeId) document.getElementById(closeId).classList.remove('show');
  if(event.target.classList.contains('modal')) event.target.classList.remove('show');
  if(event.target.classList.contains('add-friend')){
    event.target.textContent = 'Friend Added';
    event.target.closest('.friend-card').classList.add('added');
  }
});

const langToggle = document.querySelector('#langToggle');
let lang = 'id';
langToggle.addEventListener('click', () => {
  lang = lang === 'id' ? 'en' : 'id';
  document.querySelector('[data-id="heroLead"]').textContent = lang === 'id'
    ? 'Website personal untuk mencatat, mengulas, memberi rating, dan membagikan film, series, serta anime yang pernah ditonton.'
    : 'A personal website to log, review, rate, and share movies, series, and anime you have watched.';
});
