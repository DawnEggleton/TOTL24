let bMonth, bYear;
const date = new Date();
const month = date.getMonth() + 1;
const year = date.getFullYear();

//Tracker
const trackerParams = {
    //include
    includeCategoryIds: ['4', '5', '6', '7', '10', '8', '9'],
    includeForumIds: [],
    ignoreForumIds: ['26', '45', '46', '140', '24', '50', '83', '114', '179', '115', '116', '7', '112', '233', '146', '113', '6', '5', '128', '104', '105', '106', '141', '1', '53', '2', '3', '47', '8', '30', '86', '36', '31', '32', '33', '34', '35', '42', '27', '9'],

    //define au, comm, dev, archive forums
    historyForumIds: ['49', '127'], //history
    commForumIds: ['12', '13', '182'], //comm
    commHistoryForumIds: ['290'], //comm history
    auForumIds: ['135', '232'], //au
    auHistoryForumIds: ['258'], //au history
    devForumIds: ['11', '75', '277', '154', '270', '177', '43', '256', '77', '78', '79', '80', '155', '156', '157', '158', '159', '74', '132', '188', '261', '81', '271', '272', '273', '274', '139', '285', '48', '162', '147', '89', '148', '87', '170', '118', '119', '165', '136', '171', '176', '85', '123', '88'], //dev
    reqForumIds: ['161', '10', '37', '39', '38', '40', '82', '41'], //requests
    socialForumIds: ['263', '264', '265', '257'], //social

    //set indicators
    indicators: ['fa-solid fa-circle-check', 'fa-solid fa-circle-xmark'], 
}