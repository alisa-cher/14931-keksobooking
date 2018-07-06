'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'jpg', 'png'];

  var avatarChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  var galleryPhotoChooser = document.querySelector('.ad-form__input');
  var galleryPhotoPreview = document.querySelectorAll('.ad-form__photo');
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

  var generateImages = function (evt) {
    var preview = document.createElement('img');
    preview.src = evt.target.result;

    if (!galleryPhotoPreview[0].children.length) {
      galleryPhotoPreview[0].appendChild(preview);
    } else {
      var wrapper = document.createElement('div');
      wrapper.classList.add('ad-form__photo');
      wrapper.appendChild(preview);
      galleryPhotosWrapper.appendChild(wrapper);
    }
  };

  var generateImage = function (evt, preview) {
    preview.src = evt.target.result;
  };

  var avatarInputChangeHandler = function () {
    var getImage = function (evt) {
      return generateImage(evt, avatarPreview);
    };
    uploadImages(galleryPhotoChooser, getImage);
  };

  var galleryInputChangeHandler = function () {
    uploadImages(galleryPhotoChooser, generateImages);
  };

  avatarChooser.addEventListener('change', avatarInputChangeHandler);
  galleryPhotoChooser.addEventListener('change', galleryInputChangeHandler);
})();
