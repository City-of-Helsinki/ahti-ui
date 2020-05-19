import React from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import {
  FeatureCategory,
  Tag,
  useCategoriesQuery,
  useTagsQuery,
} from '../api/generated/types.d';
import Spinner from '../../common/ui-components/Spinner/Spinner';
import spinnerAnimation from '../../common/ui-components/Spinner/animations/spinner_rudder.json';
import styles from '../ContentPage/ContentPage.module.scss';
import SuggestionForm from './SuggestionForm';

const SuggestionFormContainer: React.FC = () => {
  const {
    data: categoryData,
    loading: categoriesLoading,
  } = useCategoriesQuery();
  const { data: tagData, loading: tagsLoading } = useTagsQuery();
  const { t } = useTranslation();
  const history = useHistory();

  if (categoriesLoading || tagsLoading) {
    return (
      <Spinner
        animation={spinnerAnimation}
        width={50}
        height={50}
        className={styles.spinner}
      />
    );
  }

  const categories = categoryData.featureCategories;
  const tags = tagData.tags;

  return (
    <SuggestionForm
      categories={categories as FeatureCategory[]}
      tags={tags as Tag[]}
      onSubmit={() => {
        toast(t('suggestion_form.on_submit'), {
          position: 'top-center',
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
        history.push('/');
      }}
    />
  );
};

export default SuggestionFormContainer;
