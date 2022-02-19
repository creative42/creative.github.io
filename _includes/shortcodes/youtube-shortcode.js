const outdent = require("outdent")({ newline: " " });

module.exports = function (id, label) {
  return outdent`
    <style>

    .video-container {
      width: 50%;
      margin: 0 auto;
    }

    .video-wrapper {
      position: relative;
      padding-bottom: 56.25%;
      float: none;
      clear: both;
      width: 100%;
      height: 0;
    }

    .video-wrapper iframe {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }

    p.video-label {
      font-size: 16px;
      font-weight: bold;
      text-align: center;
    }
    </style>
    <div class="video-container">
      <div class="video-wrapper">
        <iframe src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
      </div>
      <p class="video-label">${label}</p>
    </div>`;
};