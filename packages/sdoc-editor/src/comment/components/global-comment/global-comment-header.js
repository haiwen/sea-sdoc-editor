import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Tooltip from '../../../components/tooltip';
import { INTERNAL_EVENT } from '../../../constants';
import context from '../../../context';
import EventBus from '../../../utils/event-bus';
import { eventStopPropagation } from '../../../utils/mouse-event';

const GlobalCommentHeader = ({ toggle, activeCommentGroup, setCurrentCommentGroup }) => {
  const { t } = useTranslation('sdoc-editor');
  const panelHeaderRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (panelHeaderRef.current) {
      setIsMounted(true);
    }
  }, []);

  const goBack = useCallback((event) => {
    eventStopPropagation(event);
    setCurrentCommentGroup(null);
  }, [setCurrentCommentGroup]);

  const toggleReadAll = useCallback(async (event) => {
    eventStopPropagation(event);
    try {
      await context.readAllNotifications();
      const res = await context.listUnseenNotifications();
      const notifications = res.data.notifications;
      const eventBus = EventBus.getInstance();
      eventBus.dispatch(INTERNAL_EVENT.UNSEEN_NOTIFICATIONS_COUNT, notifications?.length);
      eventBus.dispatch(INTERNAL_EVENT.NEW_NOTIFICATION);
      eventBus.dispatch(INTERNAL_EVENT.CLEAR_NOTIFICATION);
    } catch (error) {
      //
    }
  }, []);

  return (
    <div className="comments-panel-header">
      <div className="comments-panel-header-left">
        {activeCommentGroup && (
          <div className="goback sdoc-icon-btn" onClick={goBack}>
            <i className="sdocfont sdoc-previous-page" style={{ transform: 'scale(1.2)' }}></i>
          </div>
        )}
        <span className="title">{activeCommentGroup ? t('Comment_details') : t('Comments')}</span>
      </div>
      <div ref={panelHeaderRef} className="comments-panel-header-right">
        {!activeCommentGroup && (
          <div
            id='sdoc-read-all-btn'
            className="sdoc-icon-btn"
            onClick={toggleReadAll}
          >
            <i className="sdocfont sdoc-all-read"></i>
            {isMounted && (
              <Tooltip target="sdoc-read-all-btn">
                {t('Mark_all_as_read')}
              </Tooltip>)}
          </div>
        )}
        <div className="sdoc-icon-btn" onClick={toggle}>
          <i className="sdocfont sdoc-sm-close"></i>
        </div>
      </div>
    </div>
  );

};

GlobalCommentHeader.propTypes = {
  toggle: PropTypes.func.isRequired,
  activeCommentGroup: PropTypes.object,
  setCurrentCommentGroup: PropTypes.func,
};

export default GlobalCommentHeader;
