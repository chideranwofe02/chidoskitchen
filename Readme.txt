Thanks for downloading this template!

Template Name: Yummy
Template URL: https://bootstrapmade.com/yummy-bootstrap-restaurant-website-template/
Author: BootstrapMade.com
License: https://bootstrapmade.com/license/



git filter-branch --env-filter '
OLD_EMAIL="old_email_of_softcp226@gmail.com"
CORRECT_NAME="chideranwofe02gmail.com"


if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
