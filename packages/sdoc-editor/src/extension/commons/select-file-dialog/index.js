import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal, ModalBody, Input } from 'reactstrap';
import isHotkey from 'is-hotkey';
import PropTypes from 'prop-types';
import toaster from '../../../components/toast';
import context from '../../../context';
import { getErrorMsg } from '../../../utils/common-utils';
import { ELEMENT_TYPE, FILE_TYPE } from '../../constants';
import LocalFiles from './local-files';

import './index.css';

const SelectSdocFileDialog = ({ editor, dialogType, closeDialog, insertLinkCallback, insertVideoCallback }) => {
  const { t } = useTranslation('sdoc-editor');
  const [currentSelectedFile, setCurrentSelectedFile] = useState(null);
  const [temSearchContent, setTemSearchContent] = useState('');
  const [searchContent, setSearchContent] = useState('');
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  let modalTitle;
  switch (dialogType) {
    case ELEMENT_TYPE.FILE_LINK:
      modalTitle = 'Select_file';
      break;
    case ELEMENT_TYPE.SDOC_LINK:
      modalTitle = 'Select_sdoc_document';
      break;
    case ELEMENT_TYPE.VIDEO:
      modalTitle = 'Select_video_file';
      break;
    default:
      break;
  }

  const onSelectedFile = useCallback((fileInfo) => {
    setCurrentSelectedFile(fileInfo);
  }, []);

  const insertFile = useCallback((fileInfo) => {
    const { insertFileLinkCallback, insertSdocFileLinkCallback } = insertLinkCallback || {};
    const { insertVideo } = insertVideoCallback || {};
    switch (dialogType) {
      case ELEMENT_TYPE.FILE_LINK:
        insertFileLinkCallback && insertFileLinkCallback(editor, fileInfo.name, fileInfo.file_uuid);
        break;
      case ELEMENT_TYPE.SDOC_LINK:
        insertSdocFileLinkCallback && insertSdocFileLinkCallback(editor, fileInfo.name, fileInfo.file_uuid);
        break;
      case ELEMENT_TYPE.VIDEO:
        const repoID = context.getSetting('repoID');
        const fileServerRoot = context.getSetting('fileServerRoot');
        // Get seafile's video download url as src
        const url = `${fileServerRoot}repos/${repoID}/files${fileInfo.path}/?op=download`;
        const encodedUrl = encodeURI(url);
        insertVideo && insertVideo(editor, [{ name: fileInfo.name }], [encodedUrl]);
        break;
      default:
        break;
    }
  }, [insertLinkCallback, insertVideoCallback, dialogType, editor]);

  const onSubmit = useCallback(() => {
    if (!currentSelectedFile) return;

    const { file_uuid } = currentSelectedFile;
    let fileInfo = { ...currentSelectedFile };

    // Insert video element in sdoc
    if (dialogType === ELEMENT_TYPE.VIDEO) {
      insertFile(fileInfo);
      closeDialog();
      return;
    }

    // File has no id
    if (!file_uuid || file_uuid === '') {
      context.getSdocLocalFileId(currentSelectedFile.path).then(res => {
        if (res.status === 200) {
          fileInfo = { ...currentSelectedFile, file_uuid: res.data.file_uuid };
        }

        insertFile(fileInfo);
        closeDialog();
      }).catch(error => {
        const errorMessage = getErrorMsg(error);
        toaster.danger(errorMessage);
      });
      return;
    }

    insertFile(fileInfo);
    closeDialog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSelectedFile]);

  const toggleSearch = useCallback(() => {
    setIsOpenSearch((prev) => !prev);
  }, []);

  const handleSearchInputChange = useCallback((e) => {
    const keyword = e.target.value.toLowerCase();
    setTemSearchContent(keyword);
  }, []);

  const executeSearch = useCallback(() => {
    if (!temSearchContent.trim()) {
      setSearchContent('');
      return;
    }
    setSearchContent(temSearchContent);
  }, [temSearchContent]);

  const handleInputKeyDown = useCallback((e) => {
    if (isHotkey('enter', e)) {
      e.preventDefault();
      executeSearch();
    }
    if (isHotkey('escape', e)) {
      e.preventDefault();
      e.stopPropagation();
      setIsOpenSearch(!isOpenSearch);
    }
  }, [executeSearch, isOpenSearch]);

  useEffect(() => {
    if (!isOpenSearch) {
      setSearchContent('');
    }
  }, [isOpenSearch]);

  return (
    <Modal isOpen={true} autoFocus={false} zIndex={1071} returnFocusAfterClose={false} className="sdoc-file-select-dialog" contentClassName="sdoc-file-select-modal">
      <div className='modal-header-container'>
        <h5 className='modal-title-container'>{t(modalTitle)}</h5>
        <div className='search-container'>
          {!isOpenSearch && <div className='search-icon-container'><div className='sdocfont sdoc-find-replace sdoc-files-search-popover' onClick={toggleSearch} ></div></div>}
          {isOpenSearch && (
            <div className='sdoc-files-search-popover-container'>
              <div className='sdoc-search-wrapper'>
                <div className='sdocfont sdoc-find-replace sdoc-search'></div>
                <Input autoFocus className='sdoc-search-input' onKeyUp={handleInputKeyDown} onChange={handleSearchInputChange} id='sdoc-search' placeholder={t('Search')} />
                <div className='sdocfont sdoc-close1 sdoc-close' onClick={toggleSearch}></div>
              </div>
            </div>
          )}
        </div>
        <div className='sdocfont sdoc-close1 sdoc-close-dialog' onClick={closeDialog}></div>
      </div>
      <ModalBody className='p-0'>
        <div className='sdoc-file-select-container'>
          <LocalFiles fileType={FILE_TYPE[dialogType]} onSelectedFile={onSelectedFile} toggle={closeDialog} searchContent={searchContent} isOpenSearch={isOpenSearch} />
          <div className='sdoc-file-select-footer'>
            <Button color='secondary' className='mr-2' onClick={closeDialog}>{t('Cancel')}</Button>
            <Button color='primary' className='highlight-bg-color' disabled={!currentSelectedFile} onClick={onSubmit}>{t('Confirm')}</Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

SelectSdocFileDialog.propTypes = {
  editor: PropTypes.object,
  closeDialog: PropTypes.func,
};

export default SelectSdocFileDialog;
