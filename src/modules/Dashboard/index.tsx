import React, { FC, MouseEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { GalleryImage } from "store/modules/gallery/types";
import { getImages, deleteImage } from "store/modules/gallery/actions";
import { setSuccess } from "store/modules/auth/actions";

import Button from "components/Button";
import Message from "components/Message";
import Card from "components/Card";
import Alert from "components/Alert";
import ImageModal from "components/Modals/ImageModal";
import UploadImagesModal from "components/Modals/UploadImageModal";

const Dashboard: FC = ({}) => {
  const { user, needVerification, success } = useSelector((state: RootState) => state.auth);
  const { images, imagesLoaded } = useSelector((state: RootState) => state.gallery);
  const dispatch = useDispatch();
  const [showUploadImagesModal, setShowUploadImagesModal] = useState(false);
  const [showDeleteImageAlert, setShowDeleteImageAlert] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [userImages, setUserImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    if (!imagesLoaded) {
      dispatch(getImages());
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const filtered = images.filter(i => i.uploaderId === user?.id);
      setUserImages(filtered);
    } else {
      setUserImages([]);
    }
    // eslint-disable-next-line
  }, [images]);

  useEffect(() => {
    if (success) {
      dispatch(setSuccess(""));
    }
  }, [success, dispatch]);

  const deleteHandler = (image: GalleryImage, e: MouseEvent) => {
    e.preventDefault();
    setShowDeleteImageAlert(true);
    setSelectedImage(image);
  };

  const deleteImageHandler = () => {
    if (selectedImage) {
      setDeleting(true);
      dispatch(
        deleteImage(selectedImage, () => {
          setDeleting(false);
          setShowDeleteImageAlert(false);
        })
      );
    }
  };

  return (
    <section>
      <div>
        {needVerification && <Message type="success" msg="Please verify your email address." />}
        <h1>Welcome {user?.firstName}</h1>
        <Button text="Upload images" onClick={() => setShowUploadImagesModal(true)} />
        {!imagesLoaded ? (
          <h2>Loading images...</h2>
        ) : userImages.length === 0 ? (
          <Message type="info" msg="No images, please upload some" />
        ) : (
          <div>
            {userImages.map((image: GalleryImage) => (
              <Card
                key={image.id}
                onDelete={(e: MouseEvent) => deleteHandler(image, e)}
                imageUrl={image.imageUrl}
                onImageClick={() => setImageUrl(image.imageUrl)}
              />
            ))}
          </div>
        )}
        {showUploadImagesModal && <UploadImagesModal onClose={() => setShowUploadImagesModal(false)} />}
        {showDeleteImageAlert && (
          <Alert
            title="Are you sure you want to delete this image ?"
            onClose={() => setShowDeleteImageAlert(false)}
            onSubmit={deleteImageHandler}
            deleting={deleting}
          />
        )}
        {imageUrl && <ImageModal url={imageUrl} onClose={() => setImageUrl("")} />}
      </div>
    </section>
  );
};

export default Dashboard;
