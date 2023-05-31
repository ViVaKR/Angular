export class User {
  /**
   * 
   * @param id 
   * @param fullName 
   * @param userName 
   * @param email 
   */

  constructor(
    public id: string,        // 아이디
    public fullName: string,  // 이름
    public userName: string,  // == 이메일
    public email: string      // 이메일
  ) {}
}
