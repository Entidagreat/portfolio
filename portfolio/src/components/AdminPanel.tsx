"use client";

import { FC, useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanel: FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchContacts();
    }
  }, [isOpen]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/contacts');
      const result = await response.json();
      
      if (result.success) {
        setContacts(result.data);
      } else {
        console.error('Failed to fetch contacts:', result.error);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const handleBackToList = () => {
    setSelectedContact(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedContact ? t('admin.detailTitle') : t('admin.title')}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          {selectedContact ? (
            /* Contact Detail View */
            <div className="p-6">
              <button
                onClick={handleBackToList}
                className="mb-4 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
{t('admin.backToList')}
              </button>

              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">{t('admin.labels.name')}</label>
                    <div className="p-3 bg-white rounded-md border text-gray-900 font-medium">{selectedContact.name}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">{t('admin.labels.email')}</label>
                    <div className="p-3 bg-white rounded-md border">
                      <a href={`mailto:${selectedContact.email}`} className="text-blue-700 hover:text-blue-900 hover:underline font-medium">
                        {selectedContact.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">{t('admin.labels.subject')}</label>
                  <div className="p-3 bg-white rounded-md border text-gray-900 font-medium">{selectedContact.subject}</div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">{t('admin.labels.message')}</label>
                  <div className="p-4 bg-white rounded-md border min-h-[120px] whitespace-pre-wrap text-gray-900 leading-relaxed">
                    {selectedContact.message}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-sm font-medium text-gray-700">
                    {t('admin.labels.sentAt')} {formatDate(selectedContact.created_at)}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    selectedContact.is_read 
                      ? 'bg-green-200 text-green-900' 
                      : 'bg-yellow-200 text-yellow-900'
                  }`}>
                    {selectedContact.is_read ? t('admin.status.read') : t('admin.status.unread')}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Contact List View */
            <div className="p-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  <span className="ml-3 text-gray-600">{t('common.loading')}</span>
                </div>
              ) : contacts.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m-2 5v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">{t('admin.noContacts')}</h3>
                  <p className="mt-1 text-sm text-gray-500">{t('admin.noContactsDesc')}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Tổng số liên hệ: {contacts.length}
                    </h3>
                    <button
                      onClick={fetchContacts}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Làm mới
                    </button>
                  </div>

                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      onClick={() => handleContactClick(contact)}
                      className="bg-white border border-gray-300 rounded-lg p-4 hover:shadow-lg hover:border-gray-400 transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-gray-900">{contact.name}</h4>
                            <span className="text-sm text-gray-700 font-medium">({contact.email})</span>
                            {!contact.is_read && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-red-200 text-red-900">
                                Mới
                              </span>
                            )}
                          </div>
                          <p className="text-sm font-semibold text-gray-800 mb-1">{contact.subject}</p>
                          <p className="text-sm text-gray-700 line-clamp-2">{contact.message}</p>
                        </div>
                        <div className="flex-shrink-0 ml-4">
                          <div className="text-sm text-gray-700 font-medium text-right">
                            {formatDate(contact.created_at)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};