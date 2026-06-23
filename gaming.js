        const themes = {
            'default theme': { bg: '#050c09', acc: '#ff4d6d', txt: '#95d5b2' },
            'midnight': { bg: '#0b0e14', acc: '#3b82f6', txt: '#94a3b8' },
            'solar': { bg: '#1e1b4b', acc: '#f59e0b', txt: '#818cf8' },
            'void': { bg: '#000000', acc: '#ffffff', txt: '#888888' },
            'cyber': { bg: '#0f0524', acc: '#00fff2', txt: '#ff00c8' },
            'forest': { bg: '#061a06', acc: '#d4af37', txt: '#228b22' },
            'lava': { bg: '#1a0505', acc: '#ff4500', txt: '#ff7f50' },
            'ocean': { bg: '#001219', acc: '#00b4d8', txt: '#90e0ef' },
            'tokyo': { bg: '#1a1b26', acc: '#7aa2f7', txt: '#bb9af7' },
            'nordic': { bg: '#2e3440', acc: '#88c0d0', txt: '#d8dee9' },
            'rose': { bg: '#190a0f', acc: '#fb7185', txt: '#fda4af' },
            'matrix': { bg: '#000000', acc: '#00ff41', txt: '#003b00' },
            'phantom': { bg: '#0d0d0d', acc: '#8a2be2', txt: '#4b0082' },
            'blood': { bg: '#0a0000', acc: '#ff0000', txt: '#800000' },
            'gold': { bg: '#141414', acc: '#ffd700', txt: '#b8860b' },
            'neon': { bg: '#000000', acc: '#39ff14', txt: '#006400' },
            'slate': { bg: '#0f172a', acc: '#38bdf8', txt: '#94a3b8' },
            'dracula': { bg: '#282a36', acc: '#bd93f9', txt: '#f8f8f2' },
            'coffee': { bg: '#1b1411', acc: '#d2691e', txt: '#deb887' },
            'ghost': { bg: '#f8f9fa', acc: '#343a40', txt: '#adb5bd' },
            'candy': { bg: '#1a001a', acc: '#ff69b4', txt: '#da70d6' },
            'classic': { bg: '#111', acc: '#00ffcc', txt: '#fff' }
        };

        let allGames = [];
        let allPartners = [];
        let currentPage = 'home';

        

        function toggleSettings() { document.getElementById('settings-modal').classList.toggle('active'); }

        function toggleClock(show) {
            document.getElementById('sys-clock').style.display = show ? 'block' : 'none';
            localStorage.setItem('dk_clock', show);
        }

        function updateClock() {
            const now = new Date();
            document.getElementById('sys-clock').innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }

        function applyPreset(val) {
            const p = themes[val];
            setTheme(p.bg, p.acc, p.txt);
            localStorage.setItem('dk_theme_pref', val);
            loadPage(currentPage);
        }

        function setTheme(bg, acc, txt) {
            const r = document.documentElement;
            r.style.setProperty('--bg-dark', bg);
            r.style.setProperty('--bg-medium', bg); 
            r.style.setProperty('--accent', acc);
            r.style.setProperty('--text-main', txt);
        }

     

        function exportData() {
            const bundle = {
                localStorage: { ...localStorage },
                cookies: document.cookie,
                theme: localStorage.getItem('dk_theme_pref')
            };
            const blob = new Blob([JSON.stringify(bundle)], {type: 'application/json'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'dkubgsitesave.json';
            a.click();
        }

        function importData() {
            const input = document.createElement('input');
            input.type = 'file';
            input.onchange = e => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = () => {
                    const data = JSON.parse(reader.result);
                    Object.keys(data.localStorage).forEach(k => localStorage.setItem(k, data.localStorage[k]));
                    alert("Profile imported! Refreshing...");
                    location.reload();
                };
                reader.readAsText(file);
            };
            input.click();
        }

       

        function loadPage(name) {
            currentPage = name;
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            const active = document.getElementById('nav-' + name);
            if(active) active.classList.add('active');
            const frame = document.getElementById('content-frame');
            
            if(name === 'home') frame.srcdoc = generateHome();
            if(name === 'games') frame.srcdoc = generateGames();
            if(name === 'partners') frame.srcdoc = generatePartners();
        }

        function generateHome() {
            return `<body style="margin:0;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#06230a;font-family:'Segoe UI',sans-serif;color:#fff;border-top:8px solid #ff4766;"><img src="https://cdn.jsdelivr.net/gh/dk-ubg/games@main/assets/dk-ubg.png" style="width:120px;height:120px;border-radius:50%;border:4px solid #4caf50;background:#fff;padding:5px;box-shadow:0 0 30px rgba(76,175,80,0.4);object-fit:contain;"><h1 style="margin:20px 0 5px;letter-spacing:2px;font-size:2.5rem;color:#ff4766;text-shadow:2px 2px #000;">DK <span style="color:#4caf50">UBG</span></h1><p style="text-transform:uppercase;letter-spacing:4px;font-size:10px;opacity:0.7;background:rgba(255,255,255,0.1);padding:4px 12px;border-radius:20px;">DK UBG</p></body>`;
        }

        function generateGames() {
            return `<html><head><style>
                body { background:#050c09; color:white; font-family:sans-serif; padding:20px; margin:0; }
                .lib-bar { display:flex; gap:10px; margin-bottom:20px; flex-wrap:wrap; justify-content:center;}
                .lib-btn { padding:10px 15px; background:rgba(255,255,255,0.05); border:1px solid #ff4d6d; color:white; cursor:pointer; border-radius:8px; font-size:12px; font-weight:bold; transition:0.3s;}
                .lib-btn:hover { background:#ff4d6d; }
                #search { width:100%; padding:15px; background:rgba(0,0,0,0.3); border:1px solid #ff4d6d; color:white; border-radius:10px; margin-bottom:10px; outline:none; }
                #game-count { color: #95d5b2; font-size: 14px; margin-bottom: 15px; font-weight: bold; text-align: center; }
                #grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap:15px; }
                .card { background:rgba(255,255,255,0.05); border-radius:10px; overflow:hidden; border:1px solid rgba(255,255,255,0.1); text-align:center; transition:0.3s; padding-bottom:10px;}
                .card img { width:100%; height:100px; object-fit:cover; background:#000; opacity:0; transition:0.5s; }
                .card img.loaded { opacity:1; }
                .play-btn { background:#ff4d6d; color:white; border:none; padding:8px; border-radius:5px; cursor:pointer; width:90%; font-weight:bold; margin-top:5px;}
            </style></head><body>
                <div class="lib-bar">
                    <button class="lib-btn" onclick="parent.loadLibrary('ugs')">UGS</button>
                    <button class="lib-btn" onclick="parent.loadLibrary('hydra')">HYDRA</button>
                    <button class="lib-btn" onclick="parent.loadLibrary('ckv')">CKV</button>
                    <button class="lib-btn" onclick="parent.loadLibrary('gn')">GN MATH</button>
                    <button class="lib-btn" style="border-style:dashed;" onclick="parent.loadLibrary('all')">LOAD ALL</button>
                </div>
                <input type="text" id="search" placeholder="Search..." oninput="parent.handleSearch(this.value)">
                <div id="game-count">Select a library</div>
                <div id="grid"></div>
                <script>
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if(entry.isIntersecting) {
                                const img = entry.target;
                                img.src = img.dataset.src;
                                img.onload = () => img.classList.add('loaded');
                                observer.unobserve(img);
                            }
                        });
                    }, { rootMargin: '150px' });

                    window.updateGrid = (data) => {
                        const grid = document.getElementById('grid');
                        const count = document.getElementById('game-count');
                        count.innerText = data.length + " Games Loaded";
                        grid.innerHTML = data.map(g => \`
                            <div class="card">
                                <img class="lazy" data-src="\${g.img}" src="">
                                <div style="font-size:10px; margin:8px 5px; height:24px; overflow:hidden;">\${g.name}</div>
                                <button class="play-btn" onclick="parent.playGame('\${g.url}')">PLAY</button>
                            </div>\`).join('');
                        document.querySelectorAll('.lazy').forEach(img => observer.observe(img));
                    };
                <\/script>
            </body></html>`;
        }

        function generatePartners() {
            return `<html><body style="background:#050c09; color:white; font-family:sans-serif; padding:40px; text-align:center;">
                <h1 style="color:#ff4d6d;">Partners</h1>
                <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap:20px; margin-top:30px;">
                    ${allPartners.map(p => `
                        <div style="background:rgba(255,255,255,0.05); padding:20px; border-radius:15px; border:1px solid #ff4d6d; cursor:pointer;" onclick="window.open('${p.url}', '_blank')">
                            <img src="${p.img}" style="width:70px; height:70px; border-radius:50%; margin-bottom:10px;">
                            <h3>${p.name}</h3>
                        </div>`).join('')}
                </div>
            </body></html>`;
        }

    

        async function loadLibrary(type) {
            allGames = [];
            if(type === 'ugs' || type === 'all') await fetchUGS();
            if(type === 'hydra' || type === 'all') await fetchHydra();
            if(type === 'ckv' || type === 'all') await fetchCKV();
            if(type === 'gn' || type === 'all') await fetchGN();
            handleSearch("");
        }

        async function fetchUGS() {
            const repos = ["tharun9772/ugs-1", "tharun9772/ugs-2", "tharun9772/ugs-3"];
            for (const repo of repos) {
                const res = await fetch(`https://api.github.com/repos/${repo}/contents/`);
                const files = await res.json();
                files.filter(f => f.name.endsWith(".html") && f.name.startsWith("cl")).forEach(f => {
                    allGames.push({ name: f.name.replace("cl","").replace(".html",""), img: "https://cdn.jsdelivr.net/gh/tharun9772/game-assets@main/5968517.png", url: `https://cdn.jsdelivr.net/gh/${repo}@main/${f.name}` });
                });
            }
        }
        async function fetchHydra() {
            const res = await fetch("https://cdn.jsdelivr.net/gh/tharuniscool/hydra-assets@main/gmes.json");
            const d = await res.json();
            d.forEach(g => allGames.push({ name: g.title, img: "https://cdn.jsdelivr.net/gh/Hydra-Network/hydra-assets@main/"+g.thumb, url: "https://cdn.jsdelivr.net/gh/Hydra-Network/hydra-assets@main/gmes/"+g.file_name }));
        }
        async function fetchCKV() {
            const res = await fetch("https://cdn.jsdelivr.net/gh/carbonicality/ChickenKingsVault@main/games.json");
            const d = await res.json();
            d.forEach(g => allGames.push({ name: g.name, img: "https://cdn.jsdelivr.net/gh/carbonicality/ChickenKingsVault@main/images/"+g.img, url: "https://cdn.jsdelivr.net/gh/carbonicality/ChickenKingsVault@main/gamefiles/"+g.html }));
        }
        async function fetchGN() {
            const res = await fetch("https://cdn.jsdelivr.net/gh/freebuisness/assets/zones.json");
            const d = await res.json();
            d.filter(g => g.id !== -1).forEach(g => allGames.push({ name: g.name, img: 'https://cdn.jsdelivr.net/gh/freebuisness/covers@main/' + g.cover.replace('{COVER_URL}',''), url: 'https://cdn.jsdelivr.net/gh/freebuisness/html@master/' + g.url.replace('{HTML_URL}', '') }));
        }

        function handleSearch(query) {
            const filtered = allGames.filter(g => g.name.toLowerCase().includes(query.toLowerCase()));
            const win = document.getElementById('content-frame').contentWindow;
            if(win.updateGrid) win.updateGrid(filtered);
        }

        async function playGame(url) {
            const res = await fetch(url);
            const html = await res.text();
            const tab = window.open("about:blank", "_blank");
            if(tab) {
                tab.document.open();
                tab.document.write(html);
                tab.document.close();
            }
        }

        window.onload = async () => {
          
            const sel = document.getElementById('theme-select');
            Object.keys(themes).forEach(t => sel.innerHTML += `<option value="${t}">${t.toUpperCase()}</option>`);
            const savedTheme = localStorage.getItem('dk_theme_pref') || 'emerald';
            sel.value = savedTheme;
            applyPreset(savedTheme);

         
            const clockPref = localStorage.getItem('dk_clock') === 'true';
            toggleClock(clockPref);
            setInterval(updateClock, 1000);
            updateClock();

           
            try {
                const resP = await fetch("https://cdn.jsdelivr.net/gh/dk-ubg/games@main/assets/partners.json");
                allPartners = await resP.json();
            } catch(e){}

            loadPage('home');
        };
