export const defaultData = {
  title: 'Your First Notekit Note',
  owner: '',
  like: 0,
  comments: [],
  isShared: false,
  data: {
    time: Date.now(),
    version: '2.27.0',
    blocks: [
      {
        type: 'header',
        data: {
          text: 'Welcome to Notekit 📒',
          level: 1
        }
      },
      {
        type: 'paragraph',
        data: {
          text: 'This is your personal creative space. Edit this block or start fresh with your ideas.'
        }
      }
    ]
  }
};