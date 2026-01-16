import { handleWait } from '@/shared/utils/handle-wait';
import { useNavigate } from 'react-router-dom';
import { useLayoutStore } from '../stores/layoutStore';

export const useNoteServices = () => {
  const navigate = useNavigate();
  const setAppLoading = useLayoutStore((s) => s.setAppLoading);

  const openNewNote = () => {
    handleWait(() => {
      setAppLoading(true);
      handleWait(async () => {
        await navigate('/note/new');
        setAppLoading(false);
      }, 600);
    }, 200);
  };

  const openEditNote = () => {};

  const pasteFromClipboard = async () => {
    const text = await navigator.clipboard.readText();
    if (!text.trim()) return;

    sessionStorage.setItem('draft:clipboard', text);
    handleWait(() => navigate('/note/new?source=clipboard'), 200);
  };

  return { openNewNote, pasteFromClipboard, openEditNote };
};
