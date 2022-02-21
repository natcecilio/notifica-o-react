import { useEffect, useState } from 'react';

export const useNoticeAutoClose = ({
  notices,
  setNotices,
  autoClose,
  autoCloseTime,
}) => {
  const [removing, setRemoving] = useState('');

  useEffect(() => {
    if (removing) {
      setNotices(n => n.filter(_n => _n.id !== removing));
    }
  }, [removing, setNotices]);

  useEffect(() => {
    if (autoClose && notices.length) {
      const id = notices[notices.length - 1].id;
      setTimeout(() => setRemoving(id), autoCloseTime);
    }
  }, [notices, autoCloseTime, autoClose]);
};
