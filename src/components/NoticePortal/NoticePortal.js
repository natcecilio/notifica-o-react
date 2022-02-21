import ReactDOM from 'react-dom';
import styles from './styles.module.css';
import { useNoticePortal, useNoticeAutoClose } from 'hooks';
import { useState, forwardRef, useImperativeHandle } from 'react';
import { Notice } from 'components';
import { uuid } from 'shared';

export const NoticePortal = forwardRef(
  ({ autoClose = false, autoCloseTime = 5000 }, ref) => {
    const [notices, setNotices] = useState([]);
    const { loaded, portalId } = useNoticePortal();

    useNoticeAutoClose({ notices, setNotices, autoClose, autoCloseTime });

    const removeNotice = id => {
      setNotices(notices.filter(n => n.id !== id));
    };

    useImperativeHandle(ref, () => ({
      addMessage(notice) {
        setNotices([...notices, { ...notice, id: uuid() }]);
      },
    }));

    return loaded ? (
      ReactDOM.createPortal(
        <div className={styles.noticeContainer}>
          {notices.map(n => (
            <Notice
              key={n.id}
              mode={n.mode}
              message={n.message}
              onClose={() => removeNotice(n.id)}
            />
          ))}
        </div>,

        document.getElementById(portalId),
      )
    ) : (
      <></>
    );
  },
);
