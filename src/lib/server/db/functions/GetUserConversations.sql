CREATE OR REPLACE FUNCTION getuserconversations(_uid UUID)
RETURNS TABLE(
    "conversationId" UUID,
    uid UUID,
    "otherUid" UUID,
    "otherHandle" TEXT,
    "otherBio" TEXT,
    "otherName" TEXT,
    "otherProfileUrl" TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        c.conversation_id AS "conversationId",
        _uid AS uid,
        CASE
            WHEN c.uid_1 = _uid THEN c.uid_2
            ELSE c.uid_1
        END AS "otherUid",
        u.handle AS "otherHandle",
        u.bio AS "otherBio",
        u.name AS "otherName",
        u.profile_url AS "otherProfileUrl"
    FROM
        Conversation c
        JOIN UserProfile u ON u.uid = CASE
            WHEN c.uid_1 = _uid THEN c.uid_2
            ELSE c.uid_1
        END
    WHERE
        c.uid_1 = _uid OR c.uid_2 = _uid;
END; $$
LANGUAGE plpgsql;
