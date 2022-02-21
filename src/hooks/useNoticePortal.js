import { uuid } from 'shared';
import { useState, useEffect } from 'react';

export const useNoticePortal = () => {
  const [loaded, setLoaded] = useState(false);
  const [portalId] = useState(`notice-portal-${uuid()}`);

  useEffect(() => {
    const div = document.createElement('div');
    div.id = portalId;
    div.style = 'position: fixed; top: 10px; right: 10px';
    document.getElementsByTagName('body')[0].prepend(div);

    setLoaded(true);

    return () => document.getElementsByTagName('body')[0].removeChild(div);
  }, [portalId]);

  return { loaded, portalId };
};
