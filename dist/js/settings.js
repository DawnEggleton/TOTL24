const jcinkUCPLinks = `<div class="accordion--trigger" data-category="account"><b>Account</b></div>
        <div class="accordion--content" data-category="account">
            <a href="?act=UserCP&CODE=01">Edit Profile</a>
            <a href="?act=UserCP&CODE=24">Update Avatar</a>
            <a href="?act=UserCP&CODE=54">Sub-accounts</a>
            <a href="?act=UserCP&CODE=52">Edit Username</a>
            <a href="?act=UserCP&CODE=28">Change Password</a>
            <a href="?act=UserCP&CODE=08">Update Email</a>
        </div>
        <div class="accordion--trigger" data-category="messages"><b>Messages</b></div>
        <div class="accordion--content" data-category="messages">
            <a href="?act=Msg&CODE=01">Inbox</a>
            <a href="?act=Msg&CODE=04">Send Message</a>
        </div>
        <div class="accordion--trigger" data-category="tracking"><b>Tracking</b></div>
        <div class="accordion--content" data-category="tracking">
            <a href="?act=UserCP&CODE=alerts">Alerts</a>
            <a href="?act=UserCP&CODE=50">Forums</a>
            <a href="?act=UserCP&CODE=26">Topics</a>
        </div>
        <div class="accordion--trigger" data-category="settings"><b>Settings</b></div>
        <div class="accordion--content" data-category="settings">
            <a href="?act=UserCP&CODE=04">Board</a>
            <a href="?act=UserCP&CODE=alerts_settings">Alerts</a>
            <a href="?act=UserCP&CODE=02">Emails</a>
        </div>`;

const jcinkStoreLinks = `<a href="?act=store" class="accordion--link" data-category="home">Home</a>
    <div class="accordion--trigger" data-category="shop"><b>Shop</b></div>
    <div class="accordion--content" data-category="shop">
        <a href="?act=store&code=shop&category=5">Appreciation Badges</a>
        <a href="?act=store&code=shop&category=2">Education</a>
        <a href="?act=store&code=shop&category=6">Events</a>
        <a href="?act=store&code=shop&category=1">Features & Occupations</a>
        <a href="?act=store&code=shop&category=7">Longevity</a>
        <a href="?act=store&code=shop&category=9">Posting</a>
        <a href="?act=store&code=shop&category=8">Productivity</a>
        <a href="?act=store&code=shop&category=3">Relationship Status</a>
        <a href="?act=store&code=shop&category=4">Traits & Other</a>
    </div>
    <div class="accordion--trigger" data-category="personal"><b>Personal</b></div>
    <div class="accordion--content" data-category="personal">
        <a href="?act=store&CODE=inventory">Inventory</a>
        <a href="?act=store&code=donate_money">Send Money</a>
        <a href="?act=store&code=donate_item">Send Item</a>
    </div>
    <div class="accordion--trigger staffOnly" data-category="staff"><b>Staff</b></div>
    <div class="accordion--content staffOnly" data-category="staff">
        <a href="?act=store&code=fine" class="staffOnly">Fine</a>
        <a href="?act=store&code=edit_points" class="staffOnly">Edit Points</a>
        <a href="?act=store&code=edit_inventory" class="staffOnly">Edit Inventory</a>
    </div>`;

const openThreadsHook = `1222594842480218233/vopS3CtYII4yJDIVNs_MoaukQUCsGuBUVrrVQegm012_TV_aeQF3fv9Kwl9mrh6p6TEd`;
const generalTagsHook = `1172357121472466994/h4gBFvuwmWrNWkA_FizzToQHNea1SvAFIhQFY4RedNk8a0PHowva3S-Pldg7ER6ymmnA`;
const discordTags = [
    { alias: `Amy`, id: `274183837104472065` },
    { alias: `Bea`, id: `268531323742715908` },
    { alias: `Bells`, id: `298528035500720128` },
    { alias: `Chels`, id: `229977077753839618` },
    { alias: `Holly`, id: `296100500850343958` },
    { alias: `Kelsa`, id: `321388835525230595` },
    { alias: `Lux`, id: `253627726886469642` },
    { alias: `Meriel`, id: `343252298417438720` },
    { alias: `Sasha`, id: `577329251347595264` },
    { alias: `Spyder`, id: `189583247141765120` },
];
    
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

const charAll = ['#field_32', '#field_75', '#field_33', '#field_11', '#field_12', '#field_34', '#field_72', '#field_73', '#field_36', '#field_69', '#field_37', '#field_38', '#field_15', '#field_39', '#field_25', '#field_40', '#field_41', '#field_49', '#field_50', '#field_14', '#field_22', '#field_16', '#field_62', '#field-birthday'];

const charTrad = ['#field_42', '#field_43', '#field_44', '#field_45', '#field_48', '#field_46', '#field_47', '#field_51', '#field_52', '#field_53', '#field_55', '#field_54', '#field_56', '#field_57', '#field_58', '#field_59'];

const hasFreeform = ['#field_60', '#field_61'];

const charBasic = ['#field_76', '#field_77'];


const allHeaders = [
    {'title': 'Identifiers (Required)', 'insertBefore': '#field_74'},
    {'title': 'Images (Required)', 'insertBefore': '#field_5'},
    {'title': 'Links (Directory Required)', 'insertBefore': '#field_18'},
    {'title': 'Player (Required)', 'insertBefore': '#field_8'},
    {'title': 'Other (Optional)', 'insertBefore': '#field_13'},
];

const charHeaders = [
    {'title': 'Basics (Required)', 'insertBefore': '#field_33'},
    {'title': 'Shipper (Required)', 'insertBefore': '#field_62'},
];

const tradHeaders = [
    {'title': 'Health (Required)', 'insertBefore': '#field_43'},
    {'title': 'Magic (Required)', 'insertBefore': '#field_49'},
    {'title': 'Personality (Required)', 'insertBefore': '#field_51'},
    {'title': 'Relationships (Required)', 'insertBefore': '#field_57'},
    {'title': 'Freeform (Required)', 'insertBefore': '#field_60'},
];

const simHeaders = [
    {'title': 'Relationships (Required)', 'insertBefore': '#field_76'},
    {'title': 'Cheatsheet (Required)', 'insertBefore': '#field_77'},
    {'title': 'Freeform (Required)', 'insertBefore': '#field_60'},
];

const basicHeaders = [
    {'title': 'Relationships (Required)', 'insertBefore': '#field_76'},
    {'title': 'Cheatsheet (Required)', 'insertBefore': '#field_77'},
];