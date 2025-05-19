<?php
function detectarDispositivo() {
  $agente = $_SERVER['HTTP_USER_AGENT'];

  if (preg_match('/iPhone|iPad|iPod/', $agente)) return "Enviado de um iPhone";
  elseif (preg_match('/Android/', $agente)) return "Enviado de um Android";
  elseif (preg_match('/Windows/', $agente)) return "Enviado de um PC (Windows)";
  elseif (preg_match('/Macintosh|Mac OS/', $agente)) return "Enviado de um Mac";
  else return "Enviado de um dispositivo desconhecido";
}

$dispositivo = detectarDispositivo();
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" href="./src/assets/icons/icon.png" type="image/png">
  <title>iText</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      margin: 0;
      height: 100vh;
      background: url('./src/assets/bg/bg.jpg') no-repeat center center fixed;
      background-size: cover;
      font-family: Arial, sans-serif;
      color: #fff;
      overflow-x: hidden;
      position: relative;
    }

    .glass-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      pointer-events: none;
      z-index: -1;
    }

    nav {
      background-color: #000;
      border-bottom: 1px solid #333;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
    }

    .logo {
      font-size: 30px;
      font-weight: bold;
    }

    .hamburger {
      font-size: 24px;
      cursor: pointer;
    }

    .main {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 30px 20px;
      gap: 20px;
    }

    .box-externa {
      background-color: #111;
      padding: 30px;
      border-radius: 16px;
      width: 100%;
      max-width: 600px;
    }

    #preview {
      background-color: #000;
      padding: 30px;
      min-height: 320px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      text-align: center;
      position: relative;
      justify-content: center; /* centraliza verticalmente o conteúdo */
    }

    #post-box {
      background-color: #1e1e1e;
      border: 1px solid #3a3a3a;
      border-radius: 8px;
      padding: 30px;
      width: 90%;
      max-width: 500px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      margin: 0 auto;
    }

    #text-output {
      font-size: 20px;
      color: #fff;
      word-wrap: break-word;
      overflow-wrap: break-word;
      white-space: pre-wrap;
      max-width: 100%;
      overflow: hidden;
    }

    .dispositivo-info {
      font-size: 13px;
      color: #aaa;
      position: absolute;
      right: 30px;
      bottom: 20px;
      user-select: none;
    }

    textarea {
      width: 100%;
      margin-top: 20px;
      padding: 15px;
      font-size: 16px;
      border-radius: 8px;
      border: none;
      background-color: #222;
      color: #fff;
      resize: none;
    }

    .btn {
      margin-top: 20px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      color: #fff;
      padding: 12px 24px;
      border-radius: 10px;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .btn:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .switch-wrapper {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 15px;
    }

    .switch-wrapper input[type="checkbox"] {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: relative;
      width: 40px;
      height: 20px;
      background-color: #555;
      border-radius: 34px;
      cursor: pointer;
      transition: 0.3s;
    }

    .slider::before {
      content: "";
      position: absolute;
      height: 16px;
      width: 16px;
      left: 2px;
      bottom: 2px;
      background-color: white;
      border-radius: 50%;
      transition: 0.3s;
    }

    input:checked + .slider::before {
      transform: translateX(20px);
    }

    input:checked + .slider {
      background-color: #00c853;
    }

    .label-text {
      font-size: 14px;
      color: #ccc;
    }

    footer {
      border-top: 1px solid #333;
      padding: 20px;
      text-align: center;
      background-color: #000;
    }

    footer a {
      color: #fff;
      margin: 0 10px;
      text-decoration: none;
      font-size: 14px;
    }

    footer a:hover {
      text-decoration: underline;
    }

    footer p {
      margin-top: 10px;
      font-size: 12px;
      color: #aaa;
    }

    @media (max-width: 600px) {
      #text-output {
        font-size: 16px;
      }

      .btn {
        width: 100%;
      }

      .box-externa {
        padding: 20px;
      }

      .dispositivo-info {
        position: static;
        text-align: right;
        margin-top: 10px;
      }
    }
  </style>
</head>
<body>
  <nav>
    <div class="logo">iText</div>
    <div class="hamburger">&#9776;</div>
  </nav>

  <main class="main">
    <div class="box-externa">
      <div id="preview">
        <div id="post-box">
          <p id="text-output">Digite seu texto abaixo para criar seu post.</p>
        </div>
        <p class="dispositivo-info" id="dispositivoTexto"><?php echo $dispositivo; ?></p>
      </div>

      <label class="switch-wrapper">
        <input type="checkbox" id="toggle-device" checked>
        <span class="slider"></span>
        <span class="label-text">Mostrar dispositivo</span>
      </label>

      <textarea id="text-input" rows="5" maxlength="500" placeholder="Digite seu texto aqui (limite de 500 caracteres)..."></textarea>
      <button class="btn" onclick="generateImage()">Transformar em Post</button>
    </div>
  </main>

  <footer>
    <div>
      <a href="#">Sobre</a>
      <a href="#">Contato</a>
      <a href="#">Privacidade</a>
    </div>
    <p>&copy; 2025 iText - Criado por Maximus G Fortes</p>
  </footer>

  <div class="glass-overlay"></div>

  <script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
  <script>
    const input = document.getElementById('text-input');
    const output = document.getElementById('text-output');
    const dispositivoTexto = document.getElementById('dispositivoTexto');
    const toggleDevice = document.getElementById('toggle-device');

    input.addEventListener('input', () => {
      output.innerText = input.value || "Digite seu texto abaixo para criar seu post.";
    });

    toggleDevice.addEventListener('change', () => {
      dispositivoTexto.style.display = toggleDevice.checked ? 'block' : 'none';
    });

    function generateImage() {
      html2canvas(document.getElementById('preview')).then(canvas => {
        const link = document.createElement('a');
        link.download = 'iText-post.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  </script>
</body>
</html>
