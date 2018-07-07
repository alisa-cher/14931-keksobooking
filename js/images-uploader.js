'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'jpg', 'png'];
  var AVATAR_URL = 'img/muffin-grey.svg';

  var avatarChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  var galleryPhotoChooser = document.querySelector('.ad-form__input');
  var galleryAllPhotosContainer = document.querySelector('.ad-form__photo-container');
  var galleryMainPreviewWrapper = document.querySelector('.ad-form__photo:not(.ad-form__photo--secondary)');
  var gallerySecondaryPreviewsWrapper = document.querySelectorAll('.ad-form__photo--secondary');

  var setImagePath = function (evt, preview) {
    preview.src = evt.target.result;
  };

  var uploadImages = function (chooser, cb) {
    for (var i = 0; i < chooser.files.length; i++) {
      var file = chooser.files[i];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var picReader = new FileReader();
        picReader.addEventListener('load', cb);
        picReader.readAsDataURL(file);
      }
    }
  };

  var galleryImagesLoadHandler = function (evt) {
    var preview = document.createElement('img');
    var previewWrapper = document.createElement('div');

    setImagePath(evt, preview);

    if (!galleryMainPreviewWrapper.children.length) {
      galleryMainPreviewWrapper.appendChild(preview);
    } else {
      previewWrapper.classList.add('ad-form__photo', 'ad-form__photo--secondary');
      previewWrapper.appendChild(preview);
      galleryAllPhotosContainer.appendChild(previewWrapper);
    }
  };

  var avatarInputChangeHandler = function () {
    var avatarLoadHandler = function (evt) {
      return setImagePath(evt, avatarPreview);
    };
    uploadImages(avatarChooser, avatarLoadHandler);
  };

  var galleryInputChangeHandler = function () {
    uploadImages(galleryPhotoChooser, galleryImagesLoadHandler);
  };

  window.uploader = {
    clearPreviews: function () {
      avatarPreview.src = AVATAR_URL;
      var mainPreview = galleryMainPreviewWrapper.querySelector('img');

      if (mainPreview) {
        mainPreview.remove();
      }

      for (var i = 0; i < gallerySecondaryPreviewsWrapper.length; i++) {
        gallerySecondaryPreviewsWrapper[i].remove();
      }
    }
  };

  avatarChooser.addEventListener('change', avatarInputChangeHandler);
  galleryPhotoChooser.addEventListener('change', galleryInputChangeHandler);
})();

