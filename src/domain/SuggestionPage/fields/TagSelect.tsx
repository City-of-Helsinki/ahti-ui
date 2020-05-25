import React from 'react';

import { Tag } from '../../api/generated/types.d';
import styles from '../SuggestionForm.module.scss';
import Breadcrumb from '../../../common/ui-components/Breadcrumb/Breadcrumb';
import { useTagAndCategoryTranslations } from '../../utils/hooks';

interface TagSelectProps {
  readonly labelText: string;
  readonly selectedLabelText: string;
  readonly noSelectedTagsText: string;
  readonly tags: Tag[];
  readonly selectedTagIds: string[];
  onSelect(id: string): void;
  onDeselect(id: string): void;
}

const TagSelect: React.FC<TagSelectProps> = ({
  labelText,
  selectedLabelText,
  noSelectedTagsText,
  tags,
  selectedTagIds,
  onSelect,
  onDeselect,
}) => {
  const tagAndCategoryTranslations = useTagAndCategoryTranslations();
  return (
    <div>
      <div>
        <label className={styles.labelText}>{labelText}</label>
        {tags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => onSelect(tag.id)}
            type="button"
            className={styles.tag}
          >
            {`#${tag.name}`}
          </button>
        ))}
      </div>
      <div>
        <label className={styles.labelText}>{selectedLabelText}</label>
        {selectedTagIds.length === 0 ? (
          <span className={styles.noSelectedTags}>{noSelectedTagsText}</span>
        ) : (
          <Breadcrumb
            items={selectedTagIds.map((selectedTagId) => {
              return {
                id: selectedTagId,
              };
            })}
            onClose={onDeselect}
            translations={tagAndCategoryTranslations}
          />
        )}
      </div>
    </div>
  );
};

export default TagSelect;
