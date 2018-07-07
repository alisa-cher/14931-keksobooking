'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'jpg', 'png'];
  var AVATAR_URL = 'img/muffin-grey.svg';

  var avatarChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  var galleryPhotoChooser = document.querySelector('.ad-form__input');
  var galleryPhotoMainPreview = document.querySelector('.ad-form__photo:not(.ad-form__photo--secondary)');
  var galleryPhotoSecondaryPreviews = document.querySelectorAll('.ad-form__photo--secondary');
  var galleryPhotosWrapper = document.querySelector('.ad-form__photo-container');

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

  var generateGalleryImages = function (evt) {
    var preview = document.createElement('img');
    var previewWrapper = document.createElement('div');

    setImagePath(evt, preview);

    if (!galleryPhotoMainPreview.children.length) {
      galleryPhotoMainPreview.appendChild(preview);
    } else {
      previewWrapper.classList.add('ad-form__photo', 'ad-form__photo--secondary');
      previewWrapper.appendChild(preview);
      galleryPhotosWrapper.appendChild(previewWrapper);
    }
  };

  var setImagePath = function (evt, preview) {
    preview.src = evt.target.result;
  };

  var avatarInputChangeHandler = function () {
    var generateAvatar = function (evt) {
      return setImagePath(evt, avatarPreview);
    };
    uploadImages(avatarChooser, generateAvatar);
  };

  var galleryInputChangeHandler = function () {
    uploadImages(galleryPhotoChooser, generateGalleryImages);
  };

  window.uploader = {
    clearPreviews: function () {
      avatarPreview.src = AVATAR_URL;
      var mainPreview = galleryPhotoMainPreview.querySelector('img');

      if (mainPreview) {
        mainPreview.remove();
      }
      for (var i = 0; i < galleryPhotoSecondaryPreviews.length; i++) {
        galleryPhotoSecondaryPreviews[i].remove();
      }
    }
  };

  avatarChooser.addEventListener('change', avatarInputChangeHandler);
  galleryPhotoChooser.addEventListener('change', galleryInputChangeHandler);
})();

