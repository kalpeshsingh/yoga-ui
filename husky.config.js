module.exports = {
    hooks: {
        "commit-msg": "commitlint -H 'Help link will appear here' -e $HUSKY_GIT_PARAMS",
    },
};