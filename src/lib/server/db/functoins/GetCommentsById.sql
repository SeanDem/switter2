DROP FUNCTION GetCommentsById(uuid,uuid,uuid);

CREATE OR REPLACE FUNCTION GetCommentsById(_sweet_id UUID, _comment_id UUID, _resweet_id UUID) 
RETURNS TABLE (
  "commentId" UUID,
  uid UUID,
  "timestamp" TIMESTAMP WITH TIME ZONE,
  text TEXT,
  handle VARCHAR,
  name TEXT,
  "profileUrl" TEXT,
  bio TEXT,
  "commentsCount" BIGINT,
  "likesCount" BIGINT,
  "resweetsCount" BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        c.comment_id AS commentId,
        c.uid,
        c.timestamp,
        c.text,
        up.handle,
        up.name,
        up.profile_url AS profileUrl,
        up.bio,
        (SELECT COUNT(*) FROM Comment subC WHERE subC.parent_comment_id = c.comment_id) AS commentsCount,
        (SELECT COUNT(*) FROM SweetLike l WHERE l.comment_id = c.comment_id) AS likesCount,
        (SELECT COUNT(*) FROM ReSweet rs WHERE rs.resweet_id = c.resweet_id) AS resweetsCount
    FROM
        Comment c
        JOIN UserProfile up ON c.uid = up.uid
    WHERE
        (_sweet_id IS NOT NULL AND c.sweet_id = _sweet_id) OR
        (_comment_id IS NOT NULL AND c.parent_comment_id = _comment_id) OR
        (_resweet_id IS NOT NULL AND c.resweet_id = _resweet_id);
END;
$$ LANGUAGE plpgsql;
