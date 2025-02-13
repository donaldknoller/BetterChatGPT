import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useStore from '@store/store';
import PopupModal from '@components/PopupModal';
import {
  chatToMarkdown,
  downloadImg,
  downloadMarkdown,
  // downloadPDF,
  htmlToImg,
} from '@utils/chat';
import ImageIcon from '@icon/ImageIcon';
import PdfIcon from '@icon/PdfIcon';
import MarkdownIcon from '@icon/MarkdownIcon';
import JsonIcon from '@icon/JsonIcon';

import downloadFile from '@utils/downloadFile';

const DownloadChat = React.memo(
  ({ saveRef }: { saveRef: React.RefObject<HTMLDivElement> }) => {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [fileStatus, setFileStatus] = useState<string>("upload file");
    return (
      <>
        <button
          className='btn btn-neutral'
          aria-label={t('downloadChat') as string}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          {t('downloadChat')}
        </button>
        {isModalOpen && (
          <PopupModal
            setIsModalOpen={setIsModalOpen}
            title={t('downloadChat') as string}
            cancelButton={false}
          >
            <div className='p-6 border-b border-gray-200 dark:border-gray-600 flex gap-4'>
              {/* <button
                className='btn btn-neutral gap-2'
                aria-label='image'
                onClick={async () => {
                  if (saveRef && saveRef.current) {
                    const imgData = await htmlToImg(saveRef.current);
                    downloadImg(
                      imgData,
                      `${
                        useStore
                          .getState()
                          .chats?.[
                            useStore.getState().currentChatIndex
                          ].title.trim() ?? 'download'
                      }.png`
                    );
                  }
                }}
              >
                <ImageIcon />
                Image
              </button> */}
              
              {/* <button
                className='btn btn-neutral gap-2'
                aria-label='markdown'
                onClick={async () => {
                  if (saveRef && saveRef.current) {
                    const chats = useStore.getState().chats;
                    if (chats) {
                      const markdown = chatToMarkdown(
                        chats[useStore.getState().currentChatIndex]
                      );
                      downloadMarkdown(
                        markdown,
                        `${
                          chats[
                            useStore.getState().currentChatIndex
                          ].title.trim() ?? 'download'
                        }.md`
                      );
                    }
                  }
                }}
              >
                <MarkdownIcon />
                Markdown
              </button> */}
              {/* <button
                className='btn btn-neutral gap-2'
                aria-label='json'
                onClick={async () => {
                  const chats = useStore.getState().chats;
                  if (chats) {
                    const chat = chats[useStore.getState().currentChatIndex];
                    downloadFile([chat], chat.title);
                  }
                }}
              >
                <JsonIcon />
                JSON
              </button> */}
              <button
                className='btn btn-neutral gap-2'
                aria-label='internal'
                onClick={async () => {
                  setFileStatus("uploading...")
                  const chats = useStore.getState().chats;
                  if (chats) {
                    const chat = chats[useStore.getState().currentChatIndex];
                    const status = await downloadFile([chat], chat.title);
                    if(status){
                      setFileStatus(`file upload success.\n chat history saved as ${chat.title} \nyou can close now`)
                    } else {
                      setFileStatus("file upload error. complain to someone")
                    }
                  } else {
                    setFileStatus("no chat to export. close this NOW")
                  }
                }}
              >
                <JsonIcon />
                <p>{fileStatus}</p>
                
              </button>
            </div>
          </PopupModal>
        )}
      </>
    );
  }
);

export default DownloadChat;
