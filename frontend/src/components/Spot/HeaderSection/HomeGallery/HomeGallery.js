// frontend/src/Components/Spot/HomeGallery/HomeGallery.js

// import react
import { useEffect, useState, useRef } from 'react';

// import react-redux
import { useSelector, useDispatch } from 'react-redux';

// import react-router-dom
import { useParams } from 'react-router-dom';

// import store
import * as spotActions from '../../../../store/spots';
import * as sessionActions from '../../../../store/session';

// import css
import './HomeGallery.css';

// import context
import { Modal } from '../../../../context/Modal';

// import component
import ImageModal from './ImageModal';
import { useSpot } from '../../../../context/SpotContext';

//? HomeGallery component
const HomeGallery = () => {

  /**
   * Controlled inputs
   */
  // control image modal
  const [showImageModal, setShowImageModal] = useState(false);
  const { spots, setSpots } = useSpot();


  // invoke dispatch
  const dispatch = useDispatch();

  // invoke ref
  const ref = useRef();

  // get spot id
  const { spotId } = useParams();

  /**
   * Selector functions
   */
  // get session user
  const sessionUser = useSelector(sessionActions.getSessionUser);
  // get spot owner
  const spotOwner = useSelector(spotActions.getSpotOwner(spotId));

  // get spot by spot id
  const spot = spots !== undefined ? spots.find(spot => spot.id === Number(spotId)) : null;

  // const imageState = useSelector(state => state.spots);
  // const [images, setImages] = useState(imageState.Images !== undefined ? imageState.Images : imageState);
  const images = useSelector(spotActions.getImagesBySpot(spotId));

  const [fileUpload, setFileUpload] = useState(null);

  /**
   * UseEffect
   */
  useEffect(() => {
    // nothing for now
  }, [dispatch, spotId, images]);

  /**
   * Handler functions
   */
  //? handle image submit
  const handleImageSubmit = e => {
    // prevent page from refreshing
    e.preventDefault();

    const currentFileUpload = Object.values(fileUpload);

    // reset new images
    setFileUpload("");

    ref.current.value = "";

    dispatch(spotActions.thunkAddImage(currentFileUpload, spotId))
      .then(() => dispatch(spotActions.thunkGetSpots()))
      .catch(
        async res => {
          // parse error data
          const data = await res.json();

          // set any error data into validation errors
          if (data.errors) alert(Object.values(data.errors));

          return;
        }
      );
  }

  //? updateFiles: multiple file update function
  const updateFiles = e => {
    const files = e.target.files;
    setFileUpload(files);
  }

  // check if image is ready
  const checkImageLoaded = () => {
    return (
      spot
      &&
      Array.isArray(images)
    )
  }

  return (
    checkImageLoaded() ?
      <section className="gallery-image-container">
        <section className="feature-images-gallery" id={`image-${images.length}-gallery`}>
          {
            images.length === 1
              ?
              <>
                {
                  images[0] &&
                  <figure className="feature-single-image-container">
                    <img
                      onError={e => e.target.src = "https://s1.r29static.com/bin/entry/fa2/0,0,460,552/960xbm,70/1255000/image.jpg"}
                      src={images[0].url}
                      key={images[0].id + " " + images[0].url}
                      className="feature-single-image"
                      alt={`Pic ${images[0].id} of Spot ${spotId}`}
                      onClick={_ => setShowImageModal(true)}
                    />
                  </figure>
                }
              </>
              :
              (
                images.length < 5 ?
                  (images.map((image, index) => {
                    if (image) {
                      return (
                        <figure className="feature-image-container" id={`image-less-image-container-${index + 1}`} key={image.id}>
                          <img
                            onError={e => e.target.src = "https://s1.r29static.com/bin/entry/fa2/0,0,460,552/960xbm,70/1255000/image.jpg"}
                            src={image.url}
                            key={index + " " + image.id}
                            id={`feature-less-image-${index + 1}`}
                            className="feature-less-images"
                            alt={`Pic ${image.id} of Spot ${spotId}`}
                            onClick={_ => setShowImageModal(true)}
                          />
                        </figure>
                      )
                    }
                  }))
                  :
                  (images.map((image, index) => {
                    if (index < 5) {
                      return (
                        <figure className="feature-image-container" key={image.id}>
                          <img
                            onError={e => e.target.src = "https://s1.r29static.com/bin/entry/fa2/0,0,460,552/960xbm,70/1255000/image.jpg"}
                            src={image.url ? image.url : "https://s1.r29static.com/bin/entry/fa2/0,0,460,552/960xbm,70/1255000/image.jpg"}
                            key={index + " " + image.id}
                            className="feature-images"
                            alt={`Pic ${image.id} of Spot ${spotId}`}
                            onClick={_ => setShowImageModal(true)}
                          />
                        </figure>
                      )
                    }
                  }))
              )
          }
          {
            images.length <= 0 &&
              (
                sessionUser &&
                spotOwner === sessionUser.id
              ) ?
              <form className="home-gallery-no-image-aside" onSubmit={handleImageSubmit}>

                <h3>
                  No Images currently available for this spot. Would you like to add an image(s)?
                </h3>
                <span className="fa-images-container">
                  <i className="fa-regular fa-images fa-2xl"></i>
                  <i className="fa-solid fa-plus fa-2xl"></i>
                </span>

                {/* //? Multiple File Upload */}
                <label>
                  {/* Multiple Upload */}
                  <input
                    type="file"
                    multiple
                    ref={ref}
                    className="add-images-input"
                    onChange={updateFiles} />
                </label>

                {/* //? Submit Buttons Container */}
                <div className="submit-button-container">
                  {
                    fileUpload &&
                    <>
                      <button
                        className="submit-image-button"
                        type="submit"
                      >
                        Add Images
                      </button>

                      <button
                        className="cancel-image-button"
                        onClick={_ => setFileUpload([])}
                      >
                        Cancel
                      </button>
                    </>
                  }
                </div>

              </form>
              :
              images.length <= 0 &&
              <div className="not-permitted-no-image-container">
                <h3>
                  No images currently available for this spot.
                  Sign in or register to upload one!
                </h3>
              </div>
          }
        </section>
        {
          // Show Image Modal
          showImageModal
          &&
          <Modal onClose={_ => setShowImageModal(false)}>
            <ImageModal setShowImageModal={setShowImageModal} />
          </Modal>
        }
      </section>
      :
      <section className="gallery-image-container">
        <figure className="no-loaded-figure">
          {/* loading images */}
          <img
            src="https://res.cloudinary.com/dfz7bzhoi/image/upload/v1671759968/loadinganimation_qksmz6.gif"
            alt="gallery-loading-gif"
          />
        </figure>
      </section>
  )
};

// export HomeGallery component
export default HomeGallery;
