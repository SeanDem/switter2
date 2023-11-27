drop function if exists GetInteractionListByTypeAndUID (uuid, text, uuid);

create
or replace function GetInteractionListByTypeAndUID (_uid UUID, _type text, _search_uid uuid) returns table (
  "actionId" uuid,
  "sweetId" uuid,
  "commentId" uuid,
  "resweetId" uuid,
  "parentCommentId" uuid,
  "parentResweetId" uuid,
  uid uuid,
  "timestamp" timestamp with time zone,
  type text,
  text text,
  "mediaUrls" text,
  handle varchar(255),
  name text,
  "profileUrl" text,
  bio text,
  "commentsCount" bigint,
  "likesCount" bigint,
  "resweetsCount" bigint,
  "isLiked" BOOLEAN, 
  "isResweeted" BOOLEAN, 
  "isCommented" BOOLEAN 
) as $$
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
            'sweet' as type,
            s.text,
            s.media_urls as mediaUrls,
            up.handle,
            up.name,
            up.profile_url as profileUrl,
            up.bio,
            (SELECT COUNT(*) FROM Comment WHERE sweet_id = s.sweet_id) AS commentsCount,
            (SELECT COUNT(*) FROM SweetLike WHERE sweet_id = s.sweet_id) AS likesCount,
            (SELECT COUNT(*) FROM ReSweet WHERE sweet_id = s.sweet_id) AS resweetsCount,
            (SELECT EXISTS(SELECT 1 FROM SweetLike WHERE sweet_id = s.sweet_id AND SweetLike.uid = _uid)) AS isLiked,
            (SELECT EXISTS(SELECT 1 FROM ReSweet WHERE sweet_id = s.sweet_id AND ReSweet.uid = _uid)) AS isResweeted,
            (SELECT EXISTS(SELECT 1 FROM Comment WHERE sweet_id = s.sweet_id AND Comment.uid = _uid)) AS isCommented
        FROM
            Sweet s
            JOIN UserProfile up ON s.uid = up.uid
        WHERE
            s.uid = _search_uid;

    ELSIF _type = 'comment' THEN
        RETURN QUERY
        SELECT
            c.comment_id as actionId,
            c.sweet_id as sweetId,
            c.comment_id as commentId,
            NULL::UUID as resweetId,
            c.parent_comment_id as parentCommentId,
            NULL::UUID as parentResweetId,
            c.uid,
            c.timestamp,
            'comment' as type, 
            c.text,
            NULL::TEXT as mediaUrls, 
            up.handle,
            up.name,
            up.profile_url as profileUrl,
            up.bio,
            (SELECT COUNT(*) FROM Comment WHERE parent_comment_id = c.comment_id) AS commentsCount,
            (SELECT COUNT(*) FROM SweetLike WHERE comment_id = c.comment_id) AS likesCount,
            (SELECT COUNT(*) FROM ReSweet WHERE comment_id = c.comment_id) AS resweetsCount,
            (SELECT EXISTS(SELECT 1 FROM SweetLike WHERE comment_id = c.comment_id AND SweetLike.uid = _uid)) AS isLiked,
            (SELECT EXISTS(SELECT 1 FROM ReSweet WHERE comment_id = c.comment_id AND ReSweet.uid = _uid)) AS isResweeted,
            (SELECT EXISTS(SELECT 1 FROM Comment WHERE parent_comment_id = c.comment_id AND Comment.uid = _uid)) AS isCommented
        FROM
            Comment c
            JOIN UserProfile up ON c.uid = up.uid
        WHERE
            c.uid = _search_uid;

    ELSIF _type = 'resweet' THEN
        RETURN QUERY
        SELECT
            rs.resweet_id as actionId,
            rs.sweet_id as sweetId,
            NULL::UUID as commentId,
            rs.resweet_id as resweetId,
            NULL::UUID as parentCommentId,
            rs.parent_resweet_id as parentResweetId,
            rs.uid,
            rs.timestamp, 
            'resweet' as type, 
            rs.text,
            NULL::TEXT as mediaUrls,
            up.handle,
            up.name,
            up.profile_url as profileUrl,
            up.bio,
            (SELECT COUNT(*) FROM Comment WHERE resweet_id = rs.resweet_id) AS commentsCount,
            (SELECT COUNT(*) FROM SweetLike WHERE resweet_id = rs.resweet_id) AS likesCount,
            (SELECT COUNT(*) FROM ReSweet WHERE parent_resweet_id = rs.resweet_id OR resweet_id = rs.resweet_id) AS resweetsCount,
            (SELECT EXISTS(SELECT 1 FROM SweetLike WHERE resweet_id = rs.resweet_id AND SweetLike.uid = _uid)) AS isLiked,
            (SELECT EXISTS(SELECT 1 FROM ReSweet WHERE resweet_id = rs.resweet_id AND ReSweet.uid = _uid)) AS isResweeted,
            (SELECT EXISTS(SELECT 1 FROM Comment WHERE resweet_id = rs.resweet_id AND Comment.uid = _uid)) AS isCommented
        FROM
            ReSweet rs
            JOIN UserProfile up ON rs.uid = up.uid
        WHERE
            rs.uid = _search_uid;

    ELSE
        RAISE EXCEPTION 'Invalid type specified. Must be sweet, comment, or resweet.';
    END IF;
END;
$$ language plpgsql;