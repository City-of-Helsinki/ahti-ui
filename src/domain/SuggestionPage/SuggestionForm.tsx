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
}

const getTranslatedFieldValidationSchema = (t: TFunction) =>
  Yup.object()
    .shape({
      fi: Yup.string().required(
        t('suggestion_form.errors.translated_field_required')
      ),
      en: Yup.string(),
      sv: Yup.string(),
    })
    .required(t('suggestion_form.errors.translated_field_required'));

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
    name: getTranslatedFieldValidationSchema(t),
    description: getTranslatedFieldValidationSchema(t),
    shortDescription: getTranslatedFieldValidationSchema(t),
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
    address: '',
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
            <h2 className={styles.formHeading}>
              {t('suggestion_form.heading')}
            </h2>

            <TranslatedFieldInput
              labelText={t('suggestion_form.name')}
              id={'name'}
              value={values.name}
              handleChange={handleChange}
              error={errors?.name?.fi}
            />

            <TranslatedFieldInput
              labelText={t('suggestion_form.description')}
              id={'description'}
              value={values.description}
              handleChange={handleChange}
              textArea={true}
              error={errors?.description?.fi}
            />

            <TranslatedFieldInput
              labelText={t('suggestion_form.short_description')}
              id={'shortDescription'}
              value={values.shortDescription}
              handleChange={handleChange}
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
              labelText={t('suggestion_form.address')}
              id="address"
              value={values.address}
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
              <Button type="submit">{t('suggestion_form.submit')}</Button>
              {Object.keys(errors).length !== 0 && (
                <span className={styles.formError}>
                  {t('suggestion_form.errors.check_form')}
                </span>
              )}
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default SuggestionForm;
