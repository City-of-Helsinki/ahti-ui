import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import {
  CreateFeatureMutationInput,
  FeatureCategory,
  Language,
  Tag,
  useCreateFeatureMutation,
  useTagsAndCategoriesQuery,
} from '../api/generated/types.d';
import Spinner from '../../common/ui-components/Spinner/Spinner';
import spinnerAnimation from '../../common/ui-components/Spinner/animations/spinner_rudder.json';
import styles from '../ContentPage/ContentPage.module.scss';
import SuggestionForm from './SuggestionForm';
import { Submission } from './types';

const SuggestionFormContainer: React.FC = () => {
  const { data, loading, refetch } = useTagsAndCategoriesQuery({
    fetchPolicy: 'no-cache',
  });
  const [
    createFeature,
    { loading: isSubmitting, error: submissionError },
  ] = useCreateFeatureMutation();
  const { t, i18n } = useTranslation();
  const history = useHistory();

  useEffect(() => {
    refetch();
  }, [i18n.language]);

  if (loading) {
    return (
      <Spinner
        animation={spinnerAnimation}
        width={50}
        height={50}
        className={styles.spinner}
      />
    );
  }

  const onSubmit = (value: Submission) => {
    const mutationInput: CreateFeatureMutationInput = {
      categoryId: value.categoryId,
      contactInfo: {
        streetAddress: value.streetAddress,
        postalCode: value.postalCode,
        municipality: value.municipality,
        phoneNumber: value.phoneNumber,
        email: value.email,
      },
      geometry: {
        type: 'Point',
        coordinates: [value.coordinates.longitude, value.coordinates.latitude],
      },
      tagIds: value.tagIds,
      translations: [
        {
          languageCode: Language.Fi,
          name: value.name.fi,
          description: value.description.fi,
          url: value.website,
          oneLiner: value.shortDescription.fi,
        },
        {
          languageCode: Language.En,
          name: value.name.en !== '' ? value.name.en : value.name.fi,
          description:
            value.description.en !== ''
              ? value.description.en
              : value.description.fi,
          url: value.website,
          oneLiner:
            value.shortDescription.en !== ''
              ? value.shortDescription.en
              : value.shortDescription.fi,
        },
        {
          languageCode: Language.Sv,
          name: value.name.sv !== '' ? value.name.sv : value.name.fi,
          description:
            value.description.sv !== ''
              ? value.description.sv
              : value.description.fi,
          url: value.website,
          oneLiner:
            value.shortDescription.sv !== ''
              ? value.shortDescription.sv
              : value.shortDescription.fi,
        },
      ],
    };

    createFeature({ variables: { input: mutationInput } }).then(() => {
      toast.success(t('suggestion_form.on_submit'), {
        position: 'top-center',
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
      history.push('/');
    });
  };

  const categories = data.featureCategories;
  const tags = data.tags;

  return (
    <SuggestionForm
      categories={categories as FeatureCategory[]}
      tags={tags as Tag[]}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      error={submissionError}
    />
  );
};

export default SuggestionFormContainer;
