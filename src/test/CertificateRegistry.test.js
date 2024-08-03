const CertificateRegistry = artifacts.require('CertificateRegistry');

contract('CertificateRegistry', accounts => {
  it('should issue a certificate', async () => {
    const instance = await CertificateRegistry.deployed();
    const certificateId = await instance.issueCertificate(
      'John Doe',
      'Blockchain Course',
      'A',
      Math.floor(Date.now() / 1000),
      { from: accounts[0] }
    );

    const certificate = await instance.certificates(
      certificateId.logs[0].args.certificateId
    );
    assert.equal(certificate.studentName, 'John Doe');
    assert.equal(certificate.courseName, 'Blockchain Course');
    assert.equal(certificate.grade, 'A');
  });
});
