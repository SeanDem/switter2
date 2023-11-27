DROP FUNCTION IF EXISTS getInteractionsByText(uuid, TEXT, VARCHAR);

CREATE OR REPLACE FUNCTION getInteractionsByText(_uid UUID, _search_text TEXT, _type VARCHAR) 
RETURNS TABLE (
    "actionId" UUID,
    "sweetId" UUID,
    "commentId" UUID,
    "resweetId" UUID,
    "parentCommentId" UUID,
    "parentResweetId" UUID,
  uid UUID,
  "timestamp" TIMESTAMP WITH TIME ZONE,
  text TEXT,
  handle VARCHAR,
  name TEXT,
  "profileUrl" TEXT,
  bio TEXT,
  "commentsCount" BIGINT,
  "likesCount" BIGINT,
  "resweetsCount" BIGINT,
  "isLiked" BOOLEAN,  
  "isResweeted" BOOLEAN, 
  "isCommented" BOOLEAN 
) AS $$
BEGIN
    IF _type = 'sweet' THEN
        RETURN QUERY
        SELECT
            s.sweet_id as actionId,
            s.sweet_id as sweetId,
            NULL::UUID as commentId,
            NULL::UUID as resweetId,
            NULL::UUID as parentCommentId,
            NULL::UUID as parentResweetId,
            s.uid,
            s.timestamp,
            s.text,
            up.handle,
            up.name,
            up.profile_url,
            up.bio,
            (SELECT COUNT(*) FROM Comment c WHERE c.sweet_id = s.sweet_id) AS commentsCount,
            (SELECT COUNT(*) FROM SweetLike sl WHERE sl.sweet_id = s.sweet_id) AS likesCount,
            (SELECT COUNT(*) FROM ReSweet rs WHERE rs.sweet_id = s.sweet_id) AS resweetsCount,
            (SELECT EXISTS(SELECT 1 FROM SweetLike WHERE sweet_id = s.sweet_id AND SweetLike.uid = _uid)) AS isLiked,
            (SELECT EXISTS(SELECT 1 FROM ReSweet WHERE sweet_id = s.sweet_id AND ReSweet.uid = _uid)) AS isResweeted,
            (SELECT EXISTS(SELECT 1 FROM Comment WHERE sweet_id = s.sweet_id AND Comment.uid = _uid)) AS isCommented
        FROM
            Sweet s
            JOIN UserProfile up ON s.uid = up.uid
        WHERE
            s.text ILIKE _search_text;

    ELSIF _type = 'comment' THEN
        RETURN QUERY
        SELECT
            c.comment_id as actionId,
            c.sweet_id as sweetId,
            c.comment_id commentId,
            c.resweet_id as resweetId,
            c.parent_comment_id as parentCommentId,
            NULL::UUID as parentResweetId,
            c.uid,
            c.timestamp,
            c.text,
            up.handle,
            up.name,
            up.profile_url,
            up.bio,
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
            c.text ILIKE _search_text;

    ELSIF _type = 'resweet' THEN
        RETURN QUERY
        SELECT
            rs.comment_id as actionId,
            rs.sweet_id as sweetId,
            rs.comment_id commentId,
            rs.resweet_id as resweetId,
            NULL::UUID as parentCommentId,
            rs.parent_resweet_id as parentResweetId,
            rs.uid,
            rs.timestamp,
            rs.text,
            up.handle,
            up.name,
            up.profile_url,
            up.bio,
            (SELECT COUNT(*) FROM Comment c WHERE c.resweet_id = rs.resweet_id) AS commentsCount,
            (SELECT COUNT(*) FROM SweetLike sl WHERE sl.resweet_id = rs.resweet_id) AS likesCount,
            (SELECT COUNT(*) FROM ReSweet subRS WHERE subRS.parent_resweet_id = rs.resweet_id OR subRS.resweet_id = rs.resweet_id) AS resweetsCount,
            (SELECT EXISTS(SELECT 1 FROM SweetLike WHERE resweet_id = rs.resweet_id AND SweetLike.uid = _uid)) AS isLiked,
            (SELECT EXISTS(SELECT 1 FROM ReSweet WHERE resweet_id = rs.resweet_id AND ReSweet.uid = _uid)) AS isResweeted,
            (SELECT EXISTS(SELECT 1 FROM Comment WHERE resweet_id = rs.resweet_id AND Comment.uid = _uid)) AS isCommented
        FROM
            ReSweet rs
            JOIN UserProfile up ON rs.uid = up.uid
        WHERE
            rs.text ILIKE _search_text;
        ELSE
            RAISE EXCEPTION 'Invalid id. Must be _sweet_id, _comment_id, or resweet_id.';
    END IF;
END;
$$ LANGUAGE plpgsql;
