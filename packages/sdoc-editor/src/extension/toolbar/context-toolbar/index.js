import React, { useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Editor, Range } from '@seafile/slate';
import { useFocused, useSlateStatic, useReadOnly } from '@seafile/slate-react';
import { useScrollContext } from '../../../hooks/use-scroll-context';
import { MenuGroup } from '../../commons';
import { CODE_BLOCK } from '../../constants';
import { getSelectedNodeByType } from '../../core';
import TextStyleMenuList from '../../plugins/text-style/menu';

import './index.css';

const ContextToolbar = () => {
  const ref = useRef(null);
  const editor = useSlateStatic();
  const scrollRef = useScrollContext();
  const inFocus = useFocused();
  const readOnly = useReadOnly();

  const setContextToolbarPosition = useCallback(() => {
    const el = ref.current;
    const domSelection = window.getSelection();
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();
    el.style.top = `${rect.top - 42 - 12}px`; // top = Current top - Element height - Shaded part
    el.style.left = `${rect.left}px`;
    el.style.display = 'block';
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onScroll = useCallback((e) => {
    setContextToolbarPosition();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) {
      return;
    }

    if (
      readOnly ||
      !selection ||
      !inFocus ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === '' ||
      getSelectedNodeByType(editor, CODE_BLOCK)
    ) {
      scrollRef.current && scrollRef.current.removeEventListener('scroll', onScroll);
      el.removeAttribute('style');
      return;
    }

    scrollRef.current && scrollRef.current.addEventListener('scroll', onScroll);
    setContextToolbarPosition();
  });

  const onMouseDown = useCallback((event) => {
    event.preventDefault(); // prevent toolbar from taking focus away from editor
  }, []);

  const onMouseMove = useCallback(e => {
    const isMouseLeftDown = e.buttons === 1;
    if (isMouseLeftDown) {
      const el = ref.current;
      el.removeAttribute('style');
    }
  }, []);

  return createPortal(
    <div ref={ref} className='sdoc-context-toolbar' onMouseDown={onMouseDown} onMouseOver={onMouseMove}>
      <MenuGroup>
        <TextStyleMenuList editor={editor} idPrefix={'sdoc_context_toolbar'} />
      </MenuGroup>
    </div>,
    document.body,
  );
};

export default ContextToolbar;
