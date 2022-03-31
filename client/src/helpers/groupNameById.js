export const groupNameById = (groupId, groups) => {
    let groupName = '';

    groups.forEach((group) => {
        if (group.id === groupId) {
            groupName = group.group;
        }
    });
    return groupName;
};
