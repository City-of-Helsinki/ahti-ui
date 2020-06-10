import React from 'react';
import { Formik } from 'formik';
import { TFunction } from 'i18next';
import * as Yup from 'yup';
import { ObjectSchema } from 'yup';
import { useTranslation } from 'react-i18next';
import { TextInput, Button, Koros } from 'hds-react';

import { FeatureCategory, Tag } from '../api/generated/types.d';
import { initialLatitude, initialLongitude } from '../constants';
import Select from '../../common/ui-components/Select/Select';
import styles from './SuggestionForm.module.scss';
import { Submission } from './types';
import CoordinateSelect from './fields/CoordinateSelect';
import TranslatedFieldInput from './fields/TranslatedFieldInput';
import TagSelect from './fields/TagSelect';

interface SuggestionFormProps {
  readonly categories: FeatureCategory[];
  readonly tags: Tag[];
  onSubmit(value: Submission): void;
  isSubmitting?: boolean;
  error?: Error;
}

const getTranslatedFieldValidationSchema = (t: TFunction, max?: number) => {
  if (!max) {
    return Yup.object()
      .shape({
        fi: Yup.string().required(
          t('suggestion_form.errors.translated_field_required')
        ),
        en: Yup.string(),
        sv: Yup.string(),
      })
      .required(t('suggestion_form.errors.translated_field_required'));
  }
  return Yup.object()
    .shape({
      fi: Yup.string()
        .max(
          max,
          t('suggestion_form.errors.max_characters', { maxCharacters: max })
        )
        .required(t('suggestion_form.errors.translated_field_required')),
      en: Yup.string().max(
        max,
        t('suggestion_form.errors.max_characters', { maxCharacters: max })
      ),
      sv: Yup.string().max(
        max,
        t('suggestion_form.errors.max_characters', { maxCharacters: max })
      ),
    })
    .required(t('suggestion_form.errors.translated_field_required'));
};

const getValidationSchema = (
  t: TFunction,
  categories: FeatureCategory[],
  tags: Tag[]
): ObjectSchema => {
  const validCategoryIds = categories.map((category) => category.id);
  const validTagIds = tags.map((tag) => tag.id);

  return Yup.object().shape({
    email: Yup.string().email(t('suggestion_form.errors.email')),
    categoryId: Yup.string()
      .oneOf(validCategoryIds)
      .required(t('suggestion_form.errors.required')),
    tags: Yup.array().of(Yup.string().oneOf(validTagIds)),
    name: getTranslatedFieldValidationSchema(t, 64),
    description: getTranslatedFieldValidationSchema(t),
    shortDescription: getTranslatedFieldValidationSchema(t, 64),
    coordinates: Yup.object()
      .shape({
        latitude: Yup.number().required(t('suggestion_form.errors.required')),
        longitude: Yup.number().required(t('suggestion_form.errors.required')),
      })
      .required(t('suggestion_form.errors.required')),
  });
};

const SuggestionForm: React.FC<SuggestionFormProps> = ({
  categories,
  tags,
  onSubmit,
  isSubmitting = false,
  error,
}) => {
  const { t } = useTranslation();
  const validationSchema = getValidationSchema(t, categories, tags);

  const initialValues: Submission = {
    name: { fi: '', en: '', sv: '' },
    description: { fi: '', en: '', sv: '' },
    shortDescription: { fi: '', en: '', sv: '' },
    tagIds: [],
    categoryId: categories[0].id,
    website: '',
    streetAddress: '',
    municipality: '',
    postalCode: '',
    phoneNumber: '',
    email: '',
    coordinates: {
      latitude: initialLatitude,
      longitude: initialLongitude,
    },
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={validationSchema}
    >
      {({ values, errors, handleChange, handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit} className={styles.form}>
            <Koros flipHorizontal={true} className={styles.koros} />
            <div className={styles.formContent}>
              <h2 className={styles.formHeading}>
                {t('suggestion_form.heading')}
              </h2>

              <TranslatedFieldInput
                labelText={t('suggestion_form.name')}
                id={'name'}
                value={values.name}
                handleChange={handleChange}
                error={errors?.name}
              />

              <TranslatedFieldInput
                labelText={t('suggestion_form.description')}
                id={'description'}
                value={values.description}
                handleChange={handleChange}
                textArea={true}
                error={errors?.description}
              />

              <TranslatedFieldInput
                labelText={t('suggestion_form.short_description')}
                id={'shortDescription'}
                value={values.shortDescription}
                handleChange={handleChange}
                error={errors?.shortDescription}
              />

              <Select
                id="categoryId"
                value={values.categoryId}
                options={categories.map((category) => {
                  return {
                    label: category.name,
                    value: category.id,
                  };
                })}
                onChange={handleChange}
                required
                labelText={t('suggestion_form.category')}
              />

              <TagSelect
                labelText={t('suggestion_form.tags')}
                selectedLabelText={t('suggestion_form.selected_tags')}
                noSelectedTagsText={t('suggestion_form.no_selected_tags')}
                tags={tags}
                onSelect={(id) => {
                  const tagIds = new Set(values.tagIds);
                  tagIds.add(id);
                  handleChange({
                    target: { id: 'tagIds', value: Array.from(tagIds) },
                  });
                }}
                onDeselect={(id) => {
                  const tagIds = new Set(values.tagIds);
                  tagIds.delete(id);
                  handleChange({
                    target: { id: 'tagIds', value: Array.from(tagIds) },
                  });
                }}
                selectedTagIds={values.tagIds}
              />

              <TextInput
                labelText={t('suggestion_form.email')}
                id="email"
                value={values.email}
                onChange={handleChange}
                invalid={!!errors?.email}
                helperText={errors?.email}
              />
              <TextInput
                labelText={t('suggestion_form.phone')}
                id="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
              />
              <TextInput
                labelText={t('suggestion_form.street_address')}
                id="streetAddress"
                value={values.streetAddress}
                onChange={handleChange}
              />
              <TextInput
                labelText={t('suggestion_form.postal_code')}
                id="postalCode"
                value={values.postalCode}
                onChange={handleChange}
              />
              <TextInput
                labelText={t('suggestion_form.municipality')}
                id="municiplality"
                value={values.municipality}
                onChange={handleChange}
              />
              <TextInput
                labelText={t('suggestion_form.website')}
                id="website"
                value={values.website}
                onChange={handleChange}
              />

              <CoordinateSelect
                labelText={t('suggestion_form.coordinates')}
                id="coordinates"
                value={values.coordinates}
                handleChange={handleChange}
              />

              <div className={styles.formControls}>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting
                    ? t('suggestion_form.submitting')
                    : t('suggestion_form.submit')}
                </Button>
                {Object.keys(errors).length !== 0 && (
                  <span className={styles.formError}>
                    {t('suggestion_form.errors.check_form')}
                  </span>
                )}
                {error && (
                  <span className={styles.formError}>
                    {t('suggestion_form.errors.submission_error')}
                  </span>
                )}
              </div>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default SuggestionForm;
