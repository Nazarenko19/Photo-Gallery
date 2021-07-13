import React, { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Card from "components/Card";
import ImageModal from "components/Modals/ImageModal";
import { getImages } from "store/modules/galley/actions";
import { RootState } from "store";
import { GalleryImage } from "store/modules/galley/types";

const Homepage: FC = () => {
  const dispatch = useDispatch();
  const { images, imagesLoaded } = useSelector((state: RootState) => state.gallery);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (!imagesLoaded) {
      dispatch(getImages());
    }
  }, []);

  return (
    <section>
      <div>
        <h1>Welcome</h1>
        <h2>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam incidunt at animi eligendi facere reiciendis
          ad assumenda, omnis quasi id atque consequuntur obcaecati explicabo eius natus quae officiis itaque dolorem!
        </h2>
        {images && (
          <div>
            {images.map((image: GalleryImage) => (
              <Card
                key={image.id}
                imageUrl={image.imageUrl}
                onImageClick={() => setImageUrl(image.imageUrl)}
                onDelete={() => {}}
                publicCard
                uploader={image.uploaderName}
              />
            ))}
          </div>
        )}
      </div>
      {imageUrl && <ImageModal url={imageUrl} onClose={() => setImageUrl("")} />}
    </section>
  );
};

export default Homepage;
