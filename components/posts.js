const getPosts= JSON.parse(localStorage.getItem("posts"));

const myContent= document.getElementById("showPosts");
 const showHtml= getPosts.map((post,index)=>{
    //console.log(post.index);
    const react=post.reactions;
    // const currComment=document.getElementById("idComment");
    return `<div>
    <div id="postMain">    
        <h4 id="postHeading">${post.title}</h4>
        <p id="postBody">${post.body}</p>
        <div class="bg-white">
            <div class="d-flex flex-row fs-12">
                <div class="like p-2 cursor"><i class="fa fa-thumbs-o-up" style="margin-right:5px;"></i><span class="ml-1">Like</span> ${react}</div>
                <div class="like p-2 cursor"><i class="fa fa-commenting-o" style="margin-right:5px;"></i><span class="ml-1" onclick="getId(${post.id})">Comments</span></div>
                <div class="like p-2 cursor"><i class="fa fa-trash" style="margin-right:5px;"></i><span class="ml-1">Delete</span></div>
            </div>
        </div>
    </div>
    <div class="bg-light p-2 mt-3">
        <div class="d-flex flex-row align-items-start">
            <textarea class="form-control ml-1 shadow-none textarea" 
            id="commentInput${post.id}" placeholder="Write a comment..."></textarea>
        </div>
        <div class="mt-2 text-right">
            <button id="postNewComment${post.id}"
            onclick="addNewComment(${post.id},${post.userId})" class="btn btn-primary btn-sm shadow-none mr-3" type="button">
                Post comment
            </button>
         </div>
    </div>`
    
    

})
myContent.innerHTML=showHtml;


async function getId(index){
    //console.log((index-1),"index");
    //getting comments
    const comments=await fetch(`https://dummyjson.com/posts/${index}/comments`);
    //converting into JSON
    const postComments =await comments.json();
    //storing into localhost
    await localStorage.setItem("comments",JSON.stringify(postComments));
    //console.log(postComments);
    //getting comments from localstorage
    const getComments= JSON.parse(localStorage.getItem("comments"));
    //console.log(getComments);
    //Posting the comments in the UI
    const mycomments= document.getElementById("postcomments");
    //mapping the comments
    const comms=getComments.comments;
    const showComments=await comms.map((comment,index)=>{
     //console.log(comment?.user?.username);
     //console.log(comment.body);

        return `
            <div>
                <div class="d-flex justify-content-center row">
                    <div class="col-md-8">
                        <div class="d-flex flex-column comment-section">
                            <div class="bg-white p-2">
                                <div class="d-flex flex-row user-info">
                                    <div class="d-flex flex-column justify-content-start ml-2"><span class="d-block font-weight-bold name">${comment?.user?.username}</span><span class="date text-black-50">Shared publicly - Jan 2020</span>
                                    </div>
                                </div>
                                <div class="mt-2">
                                    <p class="comment-text">${comment.body}</p>
                                </div>
                            </div>
                            <div class="bg-white">
                                <div class="d-flex flex-row fs-12">
                                    <div class="like p-2 cursor"><i class="fa fa-thumbs-o-up" style="margin-right:5px;"></i><span class="ml-1">Like</span></div>
                                    
                                    <div class="like p-2 cursor"><i class="fa fa-commenting-o" style="margin-right:5px;" ></i><span class="ml-1">Edit</span></div>
                                    
                                    <div class="like p-2 cursor"
                                    onclick="deleteComment(${comment.id})"><i class="fa fa-trash" style="margin-right:5px;"></i><span class="ml-1">Delete</span></div>
                                    
                                    
                                </div>
                                <input type="text" id="cmntUpdateInput${comment.id}"     class="form-group" placeholder="Enter Updated Comment"
                                value="${comment.body}">
                                <button id="cmntUpdateButton" class="btn btn-primary" onclick="cmntUpdate(${comment.id})">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        `
    })
    mycomments.innerHTML=showComments;
    //    mycomments.innerHTML=showComments;
}


// Deleting a Comment 
async function deleteComment(index){
    //getting the comment which user want to delete
    console.log(index)
    const deleteCmnt=await fetch(`https://dummyjson.com/comments/${index}`, {
        method: 'DELETE',
    })
    // document.getElementById("postcomments").style.display="none";
    const deletedCmnt =await deleteCmnt.json();
    alert(`Open the console to Check if the Comment is Deleted or not`);
    console.log( index ,deletedCmnt);
}

// function editComment(index){
//     document.getElementById(`cmntUpdateInput${index}`).style.display="block";
//     document.getElementById("cmntUpdateButton").style.display="block";

// }
//Update a comment
async function cmntUpdate(index){
    const getComment=document.getElementById(`cmntUpdateInput${index}`).value;
    console.log(getComment);

    const editCmnt= await fetch(`https://dummyjson.com/comments/${index}`, {
        method: 'PUT', /* or PATCH */
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          body: getComment,
        })
      })
      const updateCmnt =await editCmnt.json();
      alert(`Open the console to Check if the Comment is Updated or not`);
      console.log(updateCmnt);
}

// Add New COmment

async function addNewComment(index,user){
    const newComment= document.getElementById(`commentInput${index}`).value;
    
    const getNewComment=await fetch('https://dummyjson.com/comments/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          body: newComment,
          postId: index,
          userId: user,
        })
      })
      const showNewComment= await getNewComment.json();
      alert(`Open the console to Check if the Comment is Added or not`);
      console.log(showNewComment);
}