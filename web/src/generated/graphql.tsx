import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Remark;
  createPost: Post;
  deletePost: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  react: Scalars['Boolean'];
  register: UserResponse;
  updatePost?: Maybe<Post>;
};


export type MutationCreateCommentArgs = {
  comment: Scalars['String'];
  postId: Scalars['Int'];
};


export type MutationCreatePostArgs = {
  about: Scalars['String'];
  image: Scalars['String'];
  summary: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationReactArgs = {
  postId: Scalars['Int'];
};


export type MutationRegisterArgs = {
  fields: UserInputFields;
};


export type MutationUpdatePostArgs = {
  about: Scalars['String'];
  id: Scalars['Int'];
  image: Scalars['String'];
  summary: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  about: Scalars['String'];
  createdAt: Scalars['String'];
  creator: Users;
  creatorId: Scalars['Float'];
  id: Scalars['Float'];
  image: Scalars['String'];
  image_id: Scalars['String'];
  image_url: Scalars['String'];
  points: Scalars['Float'];
  reactStatus?: Maybe<Scalars['Int']>;
  remark: Remark;
  summary: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  comments: Array<Remark>;
  me?: Maybe<Users>;
  post?: Maybe<Post>;
  posts: Array<Post>;
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};

export type Remark = {
  __typename?: 'Remark';
  comment: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  post: Post;
  postId: Scalars['Float'];
  user: Users;
  userId: Scalars['Float'];
};

export type UserInputFields = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<Users>;
};

export type Users = {
  __typename?: 'Users';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Float'];
  remark: Remark;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type ErrorSnippetFragment = { __typename?: 'FieldError', field: string, message: string };

export type PostSnippetFragment = { __typename?: 'Post', id: number, createdAt: string, updatedAt: string, about: string, points: number, reactStatus?: number | null, image_id: string, image_url: string, summary: string, creator: { __typename?: 'Users', id: number, username: string } };

export type UserResponseSnippetFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'Users', id: number, username: string } | null };

export type UserSnippetFragment = { __typename?: 'Users', id: number, username: string };

export type CreateCommentMutationVariables = Exact<{
  postId: Scalars['Int'];
  comment: Scalars['String'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Remark', id: number, comment: string, userId: number, postId: number } };

export type CreatePostMutationVariables = Exact<{
  about: Scalars['String'];
  summary: Scalars['String'];
  image: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: number, createdAt: string, updatedAt: string, summary: string, about: string, image_id: string, image_url: string, creatorId: number } };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'Users', id: number, username: string } | null } };

export type ReactMutationVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type ReactMutation = { __typename?: 'Mutation', react: boolean };

export type RegisterMutationVariables = Exact<{
  fields: UserInputFields;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename?: 'Users', id: number, username: string } | null } };

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['Int'];
  about: Scalars['String'];
  summary: Scalars['String'];
  image: Scalars['String'];
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost?: { __typename?: 'Post', id: number, about: string, summary: string } | null };

export type CommentsQueryVariables = Exact<{ [key: string]: never; }>;


export type CommentsQuery = { __typename?: 'Query', comments: Array<{ __typename?: 'Remark', id: number, comment: string, user: { __typename?: 'Users', id: number, username: string }, post: { __typename?: 'Post', id: number } }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'Users', id: number, username: string } | null };

export type PostQueryVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type PostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: number, createdAt: string, updatedAt: string, about: string, points: number, reactStatus?: number | null, image_id: string, image_url: string, summary: string, creator: { __typename?: 'Users', id: number, username: string } } | null };

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: number, createdAt: string, updatedAt: string, about: string, points: number, reactStatus?: number | null, image_id: string, image_url: string, summary: string, creator: { __typename?: 'Users', id: number, username: string } }> };

export const PostSnippetFragmentDoc = gql`
    fragment PostSnippet on Post {
  id
  createdAt
  updatedAt
  about
  points
  reactStatus
  image_id
  image_url
  summary
  creator {
    id
    username
  }
}
    `;
export const ErrorSnippetFragmentDoc = gql`
    fragment ErrorSnippet on FieldError {
  field
  message
}
    `;
export const UserSnippetFragmentDoc = gql`
    fragment UserSnippet on Users {
  id
  username
}
    `;
export const UserResponseSnippetFragmentDoc = gql`
    fragment UserResponseSnippet on UserResponse {
  errors {
    ...ErrorSnippet
  }
  user {
    ...UserSnippet
  }
}
    ${ErrorSnippetFragmentDoc}
${UserSnippetFragmentDoc}`;
export const CreateCommentDocument = gql`
    mutation CreateComment($postId: Int!, $comment: String!) {
  createComment(postId: $postId, comment: $comment) {
    id
    comment
    userId
    postId
  }
}
    `;

export function useCreateCommentMutation() {
  return Urql.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument);
};
export const CreatePostDocument = gql`
    mutation CreatePost($about: String!, $summary: String!, $image: String!) {
  createPost(about: $about, summary: $summary, image: $image) {
    id
    createdAt
    updatedAt
    summary
    about
    image_id
    image_url
    creatorId
  }
}
    `;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const DeletePostDocument = gql`
    mutation DeletePost($id: Int!) {
  deletePost(id: $id)
}
    `;

export function useDeletePostMutation() {
  return Urql.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const LoginDocument = gql`
    mutation Login($password: String!, $email: String!) {
  login(password: $password, email: $email) {
    ...UserResponseSnippet
  }
}
    ${UserResponseSnippetFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const ReactDocument = gql`
    mutation React($postId: Int!) {
  react(postId: $postId)
}
    `;

export function useReactMutation() {
  return Urql.useMutation<ReactMutation, ReactMutationVariables>(ReactDocument);
};
export const RegisterDocument = gql`
    mutation Register($fields: UserInputFields!) {
  register(fields: $fields) {
    ...UserResponseSnippet
  }
}
    ${UserResponseSnippetFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UpdatePostDocument = gql`
    mutation UpdatePost($id: Int!, $about: String!, $summary: String!, $image: String!) {
  updatePost(id: $id, about: $about, summary: $summary, image: $image) {
    id
    about
    summary
  }
}
    `;

export function useUpdatePostMutation() {
  return Urql.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument);
};
export const CommentsDocument = gql`
    query Comments {
  comments {
    id
    comment
    user {
      id
      username
    }
    post {
      id
    }
  }
}
    `;

export function useCommentsQuery(options?: Omit<Urql.UseQueryArgs<CommentsQueryVariables>, 'query'>) {
  return Urql.useQuery<CommentsQuery>({ query: CommentsDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...UserSnippet
  }
}
    ${UserSnippetFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const PostDocument = gql`
    query Post($postId: Int!) {
  post(id: $postId) {
    ...PostSnippet
  }
}
    ${PostSnippetFragmentDoc}`;

export function usePostQuery(options: Omit<Urql.UseQueryArgs<PostQueryVariables>, 'query'>) {
  return Urql.useQuery<PostQuery>({ query: PostDocument, ...options });
};
export const PostsDocument = gql`
    query Posts {
  posts {
    ...PostSnippet
  }
}
    ${PostSnippetFragmentDoc}`;

export function usePostsQuery(options?: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'>) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};