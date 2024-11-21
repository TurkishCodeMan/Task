import { Article } from '../types/news';

export const initNotifications = async () => {
  try {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted');
    } else {
      console.log('Notification permission denied');
    }
  } catch (error) {
    console.error('Error initializing notifications:', error);
  }
};
export const sendNewsNotification = async (article: Article) => {
  try {
    if (!('Notification' in window) || Notification.permission !== 'granted') {
      return;
    }

    const notification = new Notification(article.source.name, {
      body: article.title,
      icon: article.urlToImage || '/news-icon.png',
      badge: article.urlToImage || '/news-icon.png',
      timestamp: new Date(article.publishedAt).getTime(),
      tag: article.url,
      data: {
        url: article.url
      }
    });

    notification.onclick = () => {
      window.open(article.url, '_blank');
      notification.close();
    };
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};
