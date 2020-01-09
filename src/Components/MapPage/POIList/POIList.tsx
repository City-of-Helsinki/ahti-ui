import React from 'react';
import styles from './POIList.module.scss';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

const POIList = ({
  data,
  setCurrentSlide,
}: {
  data: any;
  setCurrentSlide: any;
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <div className={styles.container}>
      {data.map((poi: any, id: number) => {
        return (
          <div
            key={id}
            className={styles.poiContainer}
            style={{
              backgroundImage: `url(/images/${poi.properties.imageId}.jpeg)`,
              backgroundSize: 'cover',
            }}
            onClick={() => history.push(`map?name=${poi.properties.name}`)}
            onMouseEnter={() => setCurrentSlide(id)}
          >
            <p className={styles.poiName}>{poi.properties.name}</p>
            <h2 className={styles.poiHeader}>{poi.properties.header}</h2>
            <h2 className={styles.poiType}>
              {t(`types.${poi.properties.type}`)}
            </h2>
          </div>
        );
      })}
    </div>
  );
};

export default POIList;
