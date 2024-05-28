const lipsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
const image = `https://picsum.photos/500/900`;

accounts = [
    {
        universal: {
            name: formatName(`Salazar Slytherin`.toLowerCase().trim()),
            id: parseInt(`0`),
            groupID: parseInt(`4`),
            groupName: `Admin`.toLowerCase().trim(),
            image: image,
            type: `writer`.toLowerCase().trim(),
        },
        character: {
            bloodStatus: ``.toLowerCase().trim(),
            pronouns: ``.toLowerCase().trim(),
            relationship: ``.toLowerCase().trim(),
            age: parseInt(``),
            ageClass: ``,
            overview: ``,
        },
        writer: {
            aliasClass: `Lux`.toLowerCase().replaceAll(' ', "").replaceAll('\/', "").replaceAll(`'`, ""),
            alias: `lux`.toLowerCase().trim(),
            pronouns: `she/her`.toLowerCase().trim(),
            timezone: `gmt-04:00`.toLowerCase().trim(),
            contact: `discord`.toLowerCase().trim(),
            triggers: lipsum
        }
    },
    {
        universal: {
            name: formatName(`Nikolas Kovac`.toLowerCase().trim()),
            id: parseInt(`0`),
            groupID: parseInt(`6`),
            groupName: `Adults`.toLowerCase().trim(),
            image: image,
            type: `character`.toLowerCase().trim(),
        },
        character: {
            bloodStatus: `Halfblood`.toLowerCase().trim(),
            pronouns: `He/Him`.toLowerCase().trim(),
            relationship: `Single`.toLowerCase().trim(),
            age: parseInt(`20`),
            ageClass: `20s`,
            overview: lipsum,
        },
        writer: {
            aliasClass: `Lux`.toLowerCase().replaceAll(' ', "").replaceAll('\/', "").replaceAll(`'`, ""),
            alias: `lux`.toLowerCase().trim(),
            pronouns: `she/her`.toLowerCase().trim(),
            timezone: `gmt-04:00`.toLowerCase().trim(),
            contact: `discord`.toLowerCase().trim(),
            triggers: lipsum
        }
    },
    {
        universal: {
            name: formatName(`WIP Writer`.toLowerCase().trim()),
            id: parseInt(`0`),
            groupID: parseInt(`3`),
            groupName: `Unsorted`.toLowerCase().trim(),
            image: image,
            type: `writer`.toLowerCase().trim(),
        },
        character: {
            bloodStatus: ``.toLowerCase().trim(),
            pronouns: ``.toLowerCase().trim(),
            relationship: ``.toLowerCase().trim(),
            age: parseInt(``),
            ageClass: ``,
            overview: ``,
        },
        writer: {
            aliasClass: `Writer`.toLowerCase().replaceAll(' ', "").replaceAll('\/', "").replaceAll(`'`, ""),
            alias: `Writer`.toLowerCase().trim(),
            pronouns: `she/her`.toLowerCase().trim(),
            timezone: `gmt-04:00`.toLowerCase().trim(),
            contact: `discord`.toLowerCase().trim(),
            triggers: lipsum
        }
    },
    {
        universal: {
            name: formatName(`WIP Character`.toLowerCase().trim()),
            id: parseInt(`0`),
            groupID: parseInt(`3`),
            groupName: `Unsorted`.toLowerCase().trim(),
            image: image,
            type: `character`.toLowerCase().trim(),
        },
        character: {
            bloodStatus: `Halfblood`.toLowerCase().trim(),
            pronouns: `She/Her`.toLowerCase().trim(),
            relationship: `Married`.toLowerCase().trim(),
            age: parseInt(`30`),
            ageClass: `30s`,
            overview: lipsum,
        },
        writer: {
            aliasClass: `Writer`.toLowerCase().replaceAll(' ', "").replaceAll('\/', "").replaceAll(`'`, ""),
            alias: `Writer`.toLowerCase().trim(),
            pronouns: `she/her`.toLowerCase().trim(),
            timezone: `gmt-04:00`.toLowerCase().trim(),
            contact: `discord`.toLowerCase().trim(),
            triggers: lipsum
        }
    }
];