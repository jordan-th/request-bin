module.exports = { 
  generateURL() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randSeq = '';

    for (let i = 0; i < 6; i++) {
      randSeq += chars[Math.floor(Math.random() * 36)];
    }

    return randSeq;
  }
}