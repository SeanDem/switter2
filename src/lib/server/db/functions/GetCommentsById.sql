DROP FUNCTION GetCommentsById(uuid,uuid,uuid,uuid);

CREATE OR REPLACE FUNCTION GetCommentsById(_uid UUID, _sweet_id UUID, _comment_id UUID, _resweet_id UUID) 
RETURNS TABLE (
    "actionId" UUID,
    "commentId" UUID,
    uid UUID,
    "timestamp" TIMESTAMP WITH TIME ZONE,
    text TEXT,
    handle VARCHAR,
    name TEXT,
    "profileUrl" TEXT,
    bio TEXT,
    type TEXT,
    "commentsCount" BIGINT,
    "likesCount" BIGINT,
    "resweetsCount" BIGINT,
    "isLiked" BOOLEAN, 
    "isResweeted" BOOLEAN, 
    "isCommented" BOOLEAN 
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        c.comment_id AS actionId,
        c.comment_id AS commentId,
        c.uid,
        c.timestamp,
        c.text,
        up.handle,
        up.name,
        up.profile_url AS profileUrl,
        up.bio,
        'comment' as type,
        (SELECT COUNT(*) FROM Comment subC WHERE subC.parent_comment_id = c.comment_id) AS commentsCount,
        (SELECT COUNT(*) FROM SweetLike l WHERE l.comment_id = c.comment_id) AS likesCount,
        (SELECT COUNT(*) FROM ReSweet rs WHERE rs.resweet_id = c.resweet_id) AS resweetsCount,
        (SELECT EXISTS(SELECT 1 FROM SweetLike WHERE comment_id = c.comment_id AND SweetLike.uid = _uid)) AS isLiked,
        (SELECT EXISTS(SELECT 1 FROM ReSweet WHERE comment_id = c.comment_id AND ReSweet.uid = _uid)) AS isResweeted,
        (SELECT EXISTS(SELECT 1 FROM Comment WHERE parent_comment_id = c.comment_id AND Comment.uid = _uid)) AS isCommented
    FROM
        Comment c
        JOIN UserProfile up ON c.uid = up.uid
    WHERE
        (_sweet_id IS NOT NULL AND c.sweet_id = _sweet_id) OR
        (_comment_id IS NOT NULL AND c.parent_comment_id = _comment_id) OR
        (_resweet_id IS NOT NULL AND c.resweet_id = _resweet_id)
    ORDER BY c.timestamp DESC;
END;
$$ LANGUAGE plpgsql;
