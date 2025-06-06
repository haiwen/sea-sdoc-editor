import React, { useCallback, useContext, useMemo, useState } from 'react';
import CommentWrapper from '../comment';
import CommentsOperation from '../comment/components/comment-operation';
import { PLUGIN_DISPLAY_TYPE } from '../constants';

const PluginsContext = React.createContext(null);

export const PluginsProvider = ({ showComment, plugins: propsPlugins, children }) => {
  const [displayName, setDisplayName] = useState('');

  const closePlugin = useCallback(() => {
    setDisplayName('');
  }, []);

  const plugins = useMemo(() => {
    const allPlugins = propsPlugins;
    if (showComment) {
      allPlugins.push({
        name: 'sdoc-comment',
        icon: <CommentsOperation />,
        resizable_width: true,
        display_type: PLUGIN_DISPLAY_TYPE.RIGHT_PANEL,
        component: CommentWrapper
      });
    }
    return allPlugins;
  }, [showComment, propsPlugins]);

  const updateDisplayPlugin = useCallback((name) => {
    if (!name || displayName === name) {
      setDisplayName('');
      return;
    }
    const plugin = plugins.find(plugin => plugin.name === name);
    if (plugin?.display_type === PLUGIN_DISPLAY_TYPE.RIGHT_PANEL) {
      setDisplayName(name);
    }
  }, [displayName, plugins]);

  return (
    <PluginsContext.Provider value={{ plugins, displayPluginName: displayName, updateDisplayPlugin, closePlugin }}>
      {children}
    </PluginsContext.Provider>
  );
};

export const usePlugins = () => {
  const context = useContext(PluginsContext);
  if (!context) {
    throw new Error('\'PluginsContext\' is null');
  }

  return context;
};

