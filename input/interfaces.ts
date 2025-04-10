// interfaces.ts

/**
 * DEMONSTRATION
 * This file is used to demonstrate the functionality of the interface-to-nest-validator package.
 */

interface User {
  /**
   * The identifier of the user
   * Notice that we can leave out @validate number here, since its validation is derived from the type
   */
  id: number;
  /**
   * The name of the user
   * Notice that we can leave out @validate string here, since its validation is derived from the type
   */
  name: string;
  /**
   * The email of the user
   * @validate email
   */
  email: string;
  /**
   * The favorite color of the user
   * @validate hexcolor
   */
  favoriteColor: string;
  /**
   * Whether the user likes bananas
   * @validate boolean
   */
  likesBananas: boolean;
  /**
   * Whether the user likes apples
   * Notice that we can leave out the @validate boolean annotation, since its validation is dereived from the type
   * @notRequired
   */
  likesApples: boolean;
}
