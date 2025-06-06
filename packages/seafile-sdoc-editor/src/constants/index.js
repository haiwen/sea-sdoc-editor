import { INTERNAL_EVENT } from '@seafile/sdoc-editor';

export const EXTERNAL_EVENT = {
  INTERNAL_LINK_CLICK: 'internal_link_click',
  TOGGLE_STAR: 'toggle_star',
  UNMARK_AS_DRAFT: 'unmark_as_draft',
  SHARE_SDOC: 'share_sdoc',
  FREEZE_DOCUMENT: 'freeze_document',
  UNFREEZE: 'unfreeze',
  // change internal event to external event
  // editor
  REFRESH_DOCUMENT: INTERNAL_EVENT.REFRESH_DOCUMENT,
  NEW_NOTIFICATION: INTERNAL_EVENT.NEW_NOTIFICATION,
  CLEAR_NOTIFICATION: INTERNAL_EVENT.CLEAR_NOTIFICATION,
  // wiki
  CREATE_SDOC_FILE: INTERNAL_EVENT.CREATE_SDOC_FILE,
  CREATE_WIKI_PAGE: INTERNAL_EVENT.CREATE_WIKI_PAGE,
  // document
  IMAGE_COLUMN_TOGGLE: INTERNAL_EVENT.IMAGE_COLUMN_TOGGLE,
  COLLABORATORS_UPDATED: 'collaborators_updated',
  CHANGE_HEADER_WIDTH: 'change_header_width',
};

export const NEW_REVISION = 'new_revision';

export const TIP_TYPE = {
  DELETE_NO_CHANGES_REVISION: 'delete_no_changes_revision',
  MERGE: 'merge',
  HAS_CONFLICT_BEFORE_PUBLISH: 'has_conflict_before_publish',
  HAS_BEEN_PUBLISHED: 'has_been_published',
  HAS_BEEN_REPLACED: 'has_been_merge',
  HAS_CONFLICT_BEFORE_VIEW_CHANGES: 'has_conflict_before_view_changes',
  HAS_BEEN_REMOVED: 'has_been_removed',
  CHECKING: 'checking',
  PUBLISHING: 'publishing',
  DELETE_REVISION: 'delete_revision',
  SOURCE_DOCUMENT_CHANGED: 'source_document_changed',
};

export const TIP_TITLE = {
  [TIP_TYPE.DELETE_NO_CHANGES_REVISION]: 'Tip',
  [TIP_TYPE.MERGE]: 'Tip',
  [TIP_TYPE.HAS_CONFLICT_BEFORE_PUBLISH]: 'Tip',
  [TIP_TYPE.HAS_BEEN_PUBLISHED]: 'Tip',
  [TIP_TYPE.HAS_BEEN_REPLACED]: 'Tip',
  [TIP_TYPE.HAS_CONFLICT_BEFORE_VIEW_CHANGES]: 'Tip',
  [TIP_TYPE.HAS_BEEN_REMOVED]: 'Tip',
  [TIP_TYPE.CHECKING]: 'Tip',
  [TIP_TYPE.PUBLISHING]: 'Tip',
  [TIP_TYPE.DELETE_REVISION]: 'Delete_revision',
  [TIP_TYPE.SOURCE_DOCUMENT_CHANGED]: 'Tip',
};

export const TIP_CONTENT = {
  [TIP_TYPE.DELETE_NO_CHANGES_REVISION]: 'Rebase_delete_no_change_revision_tip',
  [TIP_TYPE.MERGE]: 'Merge_tip',
  [TIP_TYPE.HAS_CONFLICT_BEFORE_PUBLISH]: 'Has_conflict_before_publish_tip',
  [TIP_TYPE.HAS_BEEN_PUBLISHED]: 'Has_been_published_tip',
  [TIP_TYPE.HAS_BEEN_REPLACED]: 'Has_been_replaced_tip',
  [TIP_TYPE.HAS_CONFLICT_BEFORE_VIEW_CHANGES]: 'Has_conflict_before_view_changes_tip',
  [TIP_TYPE.HAS_BEEN_REMOVED]: 'Has_been_removed_tip',
  [TIP_TYPE.CHECKING]: 'Checking',
  [TIP_TYPE.PUBLISHING]: 'Publishing',
  [TIP_TYPE.DELETE_REVISION]: 'Delete_tip',
  [TIP_TYPE.SOURCE_DOCUMENT_CHANGED]: 'Source_document_changed_tip',
};
