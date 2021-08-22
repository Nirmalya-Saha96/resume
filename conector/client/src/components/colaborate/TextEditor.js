import { useCallback, useEffect, useState } from 'react';
import 'quill/dist/quill.snow.css';
import Quill from 'quill';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline'],
    [{ color: [] }, { background: [] }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ align: [] }],
    ['image', 'blockquote', 'code-block'],
    ['clean'],
  ];

export default function TextEditor() {

  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const { id: documentId } = useParams();

  // Setting up the connection to server
  useEffect(() => {
    const s = io('http://localhost:8000');
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  // capturing the changes and sending it to the server
  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta, oldDelta, source) => {
      if (source !== 'user') return;
      socket.emit('send-changes', delta);
    };
    quill.on('text-change', handler);

    return () => {
      quill.off('text-change', handler);
    };
  }, [socket, quill]);

   // update content with the changes made
   useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on('receive-changes', handler);

    return () => {
      socket.off('receive-changes', handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once('load-document', (document) => {
      quill.setContents(document);
      quill.enable();
    });

    socket.emit('get-document', documentId);
  }, [socket, quill, documentId]);

  useEffect(() => {
    const interval = setInterval(() => {
      socket.emit('save-doc', quill.getContents());
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  const WrapperRef = useCallback((wrapper) => {
    if (wrapper === null) return;
    wrapper.innerHTML = '';
    const editor = document.createElement('div');
    wrapper.append(editor);
     const q = new Quill(editor, {
      theme: 'snow',
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    q.disable();
    q.setText('Loading Nirmalya Doc Clone....');
    setQuill(q);
  }, []);
  return <div className='container' ref={WrapperRef}></div>
}
